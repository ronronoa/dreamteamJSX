"""Prepare uploaded document images for OCR."""
from __future__ import annotations

from collections.abc import Sequence
from math import sqrt

from PIL import Image, ImageEnhance, ImageOps, ImageStat

MAX_PROCESSED_PIXELS = 1_500_000
ANALYSIS_MAX_EDGE = 600
MIN_PAGE_BRIGHTNESS = 145
MIN_EDGE_CONTRAST = 22
EDGE_PADDING_RATIO = 0.008
MIN_RETAINED_DIMENSION_RATIO = 0.45


def preprocess_document_image(image: Image.Image) -> Image.Image:
    """Orient, crop when the page edge is clear, and enhance a form for OCR."""
    oriented_image = ImageOps.exif_transpose(image).convert("RGB")
    cropped_image = _crop_document_if_detectable(oriented_image)
    resized_image = _resize_to_pixel_limit(cropped_image)

    grayscale_image = ImageOps.grayscale(resized_image)
    enhanced_image = ImageOps.autocontrast(grayscale_image, cutoff=0.5)
    enhanced_image = ImageEnhance.Contrast(enhanced_image).enhance(1.3)
    enhanced_image = _apply_gamma(enhanced_image, gamma=1.08)
    return ImageEnhance.Sharpness(enhanced_image).enhance(1.15)


def _resize_to_pixel_limit(image: Image.Image) -> Image.Image:
    pixel_count = image.width * image.height
    if pixel_count <= MAX_PROCESSED_PIXELS:
        return image

    scale = sqrt(MAX_PROCESSED_PIXELS / pixel_count)
    new_size = (
        max(1, round(image.width * scale)),
        max(1, round(image.height * scale)),
    )
    return image.resize(new_size, Image.Resampling.LANCZOS)


def _crop_document_if_detectable(image: Image.Image) -> Image.Image:
    analysis_image = ImageOps.grayscale(image)
    analysis_image.thumbnail(
        (ANALYSIS_MAX_EDGE, ANALYSIS_MAX_EDGE),
        Image.Resampling.BILINEAR,
    )

    scale_x = image.width / analysis_image.width
    scale_y = image.height / analysis_image.height
    horizontal_projection = _horizontal_brightness_projection(analysis_image)
    vertical_projection = _vertical_brightness_projection(analysis_image)

    top = _find_edge(vertical_projection, from_start=True)
    bottom = _find_edge(vertical_projection, from_start=False)
    left = _find_edge(horizontal_projection, from_start=True)
    right = _find_edge(horizontal_projection, from_start=False)

    padding_x = max(1, round(analysis_image.width * EDGE_PADDING_RATIO))
    padding_y = max(1, round(analysis_image.height * EDGE_PADDING_RATIO))
    crop_left = max(0, (left - padding_x) if left is not None else 0)
    crop_top = max(0, (top - padding_y) if top is not None else 0)
    crop_right = min(analysis_image.width, (right + padding_x) if right is not None else analysis_image.width)
    crop_bottom = min(analysis_image.height, (bottom + padding_y) if bottom is not None else analysis_image.height)

    if _crop_is_too_aggressive(analysis_image.size, crop_left, crop_top, crop_right, crop_bottom):
        return image

    original_crop = (
        round(crop_left * scale_x),
        round(crop_top * scale_y),
        min(image.width, round(crop_right * scale_x)),
        min(image.height, round(crop_bottom * scale_y)),
    )
    if original_crop == (0, 0, image.width, image.height):
        return image
    return image.crop(original_crop)


def _horizontal_brightness_projection(image: Image.Image) -> list[float]:
    vertical_margin = round(image.height * 0.1)
    projection: list[float] = []

    for x_coordinate in range(image.width):
        column = image.crop((x_coordinate, vertical_margin, x_coordinate + 1, image.height - vertical_margin))
        projection.append(ImageStat.Stat(column).median[0])

    return projection


def _vertical_brightness_projection(image: Image.Image) -> list[float]:
    horizontal_margin = round(image.width * 0.1)
    projection: list[float] = []

    for y_coordinate in range(image.height):
        row = image.crop((horizontal_margin, y_coordinate, image.width - horizontal_margin, y_coordinate + 1))
        projection.append(ImageStat.Stat(row).median[0])

    return projection


def _find_edge(projection: Sequence[float], from_start: bool) -> int | None:
    if not projection:
        return None

    ordered_values = list(projection if from_start else reversed(projection))
    edge_band_size = max(1, round(len(ordered_values) * 0.025))
    edge_brightness = sum(ordered_values[:edge_band_size]) / edge_band_size
    middle_start = round(len(ordered_values) * 0.4)
    middle_end = max(middle_start + 1, round(len(ordered_values) * 0.6))
    page_brightness = sum(ordered_values[middle_start:middle_end]) / len(ordered_values[middle_start:middle_end])

    # Look for a clear brightness change, including pages on lighter backgrounds.
    if page_brightness < MIN_PAGE_BRIGHTNESS:
        return None
    brightness_difference = page_brightness - edge_brightness
    if brightness_difference < MIN_EDGE_CONTRAST:
        return None

    transition_brightness = edge_brightness + brightness_difference * 0.55
    search_limit = round(len(ordered_values) * 0.4)
    window_size = max(3, round(len(ordered_values) * 0.01))
    required_bright_rows = max(2, round(window_size * 0.75))

    for offset in range(edge_band_size, search_limit):
        window = ordered_values[offset:offset + window_size]
        if len(window) < window_size:
            break

        bright_count = sum(value >= transition_brightness for value in window)
        if bright_count >= required_bright_rows:
            edge = offset if from_start else len(projection) - offset
            return edge

    return None


def _crop_is_too_aggressive(
    image_size: tuple[int, int],
    left: int,
    top: int,
    right: int,
    bottom: int,
) -> bool:
    image_width, image_height = image_size
    crop_width = right - left
    crop_height = bottom - top
    if crop_width <= 0 or crop_height <= 0:
        return True

    return (
        crop_width < image_width * MIN_RETAINED_DIMENSION_RATIO
        or crop_height < image_height * MIN_RETAINED_DIMENSION_RATIO
    )


def _apply_gamma(image: Image.Image, gamma: float) -> Image.Image:
    lookup_table = [round(((value / 255) ** gamma) * 255) for value in range(256)]
    return image.point(lookup_table)
