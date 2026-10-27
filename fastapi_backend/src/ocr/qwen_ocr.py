import torch
from PIL import Image
from qwen_vl_utils import process_vision_info
from transformers import AutoProcessor, Qwen2VLForConditionalGeneration


# https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct/blob/35bfd575807aea1a06ed0a8de9c28f0274066b7f/README.md?code=true
class QwenOCR:
    _device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    _model_name = "Qwen/Qwen2-VL-7B-Instruct"

    _model = None
    _processor = None


    _PROMPT = (
        "Analyze the data in this image and return it as raw JSON only. "
        "Do not wrap the JSON in markdown code fences (no ```json or ```). "
        "Do not explain your answer. "
        "Do not add labels, punctuation, or extra text before or after the JSON. "
        "If a field is blank/unfilled in the image, return an empty string \"\" "
        "for text fields, null for numbers, and false for unchecked checkboxes. "
        "The format should be:\n"
        "{\n"
        '  "requestFor": "TRANSPORT_ASSISTANCE" | "EMERGENCY" | "INTER_FACILITY_TRANSFER" | "FIRST_AID", \n'
        '  "date": string,\n'
        '  "time": string,\n'
        '  "from": string,\n'
        '  "to": string,\n'
        '  "patient": {\n'
        '    "name": string,\n'
        '    "age": string,\n'
        '    "gender": "MALE" | "FEMALE" | "",\n'
        '    "birthday": string,\n'
        '    "address": {\n'
        '      "phase": number,\n'
        '      "package": number,\n'
        '      "block": number,\n'
        '      "lot": number\n'
        "    },\n"
        '    "contactPerson": string,\n'
        '    "contactNumber": string\n'
        "  },\n"
        '  "assessment": string,\n'
        '  "vitals": {\n'
        '    "bp": string,\n'
        '    "pr": string,\n'
        '    "spo2": string,\n'
        '    "temp": string\n'
        "  },\n"
        '  "dispositionType": "DROP_OFF" | "PICK_UP" | "",\n'
        '  "patientNameAndSignature": string,\n'
        '  "guardianNameAndSignature": string,\n'
        '  "waiver": string,\n'
        '  "teamInformation": {\n'
        '    "ambulanceDriver": string,\n'
        '    "responder": string[]\n'
        "  },\n"
        '  "timeInformation": {\n'
        '    "barangayOut": string,\n'
        '    "barangayIn": string,\n'
        '    "hospitalIn": string,\n'
        '    "hospitalOut": string,\n'
        '    "odometerOut": string,\n'
        '    "odometerIn": string\n'
        "  },\n"
        '  "checkedBy": string,\n'
        '  "hospitalRepresentative": string\n'
        "}"
    )

    @classmethod
    def _load_model(cls):
        if cls._model is None:
            print(f"[Qwen2-VL] Loading {cls._model_name} on {cls._device}")
            cls._model = Qwen2VLForConditionalGeneration.from_pretrained(
                cls._model_name,
                torch_dtype=torch.float16,
                device_map="auto"
            )
            cls._processor = AutoProcessor.from_pretrained(cls._model_name)
        return cls._model, cls._processor

    @classmethod
    def scan(cls, image: Image.Image, prompt: str = _PROMPT) -> str:
        model, processor = cls._load_model()

        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "image", "image": image},
                    {"type": "text", "text": prompt},
                ],
            }
        ]

        text = processor.apply_chat_template( # type: ignore
            messages, tokenize=False, add_generation_prompt=True
        )
        image_inputs, video_inputs = process_vision_info(messages) # type: ignore
        inputs = processor( # type: ignore
            text=[text],
            images=image_inputs,
            videos=video_inputs,
            padding=True,
            return_tensors="pt",
        ).to(cls._device)

        generated_ids = model.generate(**inputs, max_new_tokens=256) # type: ignore
        generated_ids_trimmed = [
            out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
        ]
        output_text = processor.batch_decode( # type: ignore
            generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
        )

        return output_text[0]
