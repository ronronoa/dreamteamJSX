import { operationController } from "@/controllers/operation.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

import { createUpload } from "@/middleware/upload";
import { type OperationLogsFormType } from "@/schemas/operation.schema";
const operationLogUpload = createUpload("operationLogs");


export const operationRoutes = Router()

/**
 test with curl

 curl -X POST "http://localhost:3000/api/operations/debug-submit" \
            -F 'operationDetails={"date":"2026-09-29","natureOfOperation":"Medical response","nameOfCaller":{"firstName":"Alex","middleInitial":"","surname":"Santos","suffix":""},"teamAssigned":["TEAM_UUID"],"responders":[]}' \
            -F 'peopleInvolved=[{"name":{"firstName":"Jamie","middleInitial":"","surname":"Reyes","suffix":""},"age":25,"sex":"Female","contactNumber":"09123456789","address":{"phase":"1","package":"A","block":"2","lot":"3"}}]' \
            -F 'operationDescription=Responded to an emergency call.' \
            -F 'vehicularDispatch={"from":"Station","to":"Incident site","vehicle":"","driver":"","departTime":"10:00","departPeriod":"AM","arrivalTime":"10:20","arrivalPeriod":"AM","odometerIn":"1200","odometerOut":"1210"}' \
            -F 'inventory=[]' \
            -F 'pinNumber=1234' \
            -F 'images=@./YOURPICTURE.png'
  **/
operationRoutes.post("/operations/debug-submit", operationLogUpload.array("images"), (req, res) => {

    if (Number( req.body.pinNumber ) !== 1234) {
      console.error("wrong pin: " + req.body.pinNumber);
      return res.status(401).json({ message: "wrong pin" });
    }

  console.log(req.body)
  console.log("===========================")

  try {
    const multerData = {
      pin: req.body.pinNumber || null,
      operationDetails: JSON.parse(req.body.operationDetails || "{}"),
      vehicularDispatch: JSON.parse(req.body.vehicularDispatch || "{}"),
      peopleInvolved: JSON.parse(req.body.peopleInvolved || "[]"),
      operationDescription: req.body.operationDescription || "",
      inventory: JSON.parse(req.body.inventory || "[]"),
      files: req.files,
    } as OperationLogsFormType;


    console.log(`Nature of operation: ${ multerData.operationDetails.natureOfOperation }`); 
    console.log(`Vehicular Driver: ${ multerData.vehicularDispatch.driver }`);

    const files = req.files as Express.Multer.File[] | undefined;

    console.log(`Received ${files?.length ?? 0} image(s)`);

    files?.forEach((file, index) => {
      console.log(`  [${index}]`, {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: `${ ( file.size / 1048576 ).toFixed(4) } MB`,
      })
    })

    return res.status(200).json({ 
      message: "Successfully parsed payload with autocomplete types active", 
      fieldsReceived: Object.keys(req.body), 
      fileCount: files?.length ?? 0 
    });

  } catch (err) {
    console.error("Syntax Error during JSON.parse parsing:", err);
    return res.status(400).json({ message: "Malformed multi-part JSON fields provided." });
  }
});

// Response Team
operationRoutes.get("/teams", requireAuth, operationController.listTeams)
operationRoutes.get("/teams/:id", requireAuth, operationController.getTeamById)
operationRoutes.post("/teams", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.createTeam)
operationRoutes.patch("/teams/:id", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.updateTeam)
operationRoutes.delete("/teams/:id", requireAuth, requireRole("SUPER_ADMIN"), operationController.deleteTeam)

// Operation Log
operationRoutes.get("/operations", requireAuth, operationController.list)
operationRoutes.get("/operations/:id", requireAuth, operationController.getById)
operationRoutes.post("/operations", requireAuth, operationController.create)
operationRoutes.patch("/operations/:id", requireAuth, operationController.update)
operationRoutes.delete("/operations/:id", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.delete)

// Status Transition

operationRoutes.post("/operations/:id/submit", requireAuth, operationController.submit)
operationRoutes.post("/operations/:id/validate", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.setStatus)
operationRoutes.post("/operations/:id/reject", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.setStatus)

// Persons Involved
operationRoutes.post("/operations/:id/persons", requireAuth, operationController.addPerson)
operationRoutes.delete("/operations/:id/persons/:personId", requireAuth, operationController.removePerson)

// Operation Responders
operationRoutes.post("/operations/:id/responders", requireAuth, operationController.addResponder)
operationRoutes.delete("/operations/:id/responders/:userId", requireAuth, operationController.removeResponder)

// Image Attachments
operationRoutes.post("/operations/:id/images", requireAuth, operationController.addImage)
operationRoutes.delete("/operations/:id/images/:attachmentId", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.removeImage)
