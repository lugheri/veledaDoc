import { PatientInformationType, PatientPersonalDataType } from "../controllers/Dtos/patient.dto"
import { ClinicPatientPersonalData } from "../models/ClinicPatientPersonalData"
import { ClinicPatientInformation } from "../models/ClinicPatientsInformation"
const { Op } = require('sequelize');

class PatientService{
  async newPatient(dataPatientInformation:PatientInformationType){
    const [ newPatient,created ] = await ClinicPatientInformation.findOrCreate({
      where:{
        name:dataPatientInformation.name,
        clinic_id:dataPatientInformation.clinic_id,
        status:1
      },
      defaults:dataPatientInformation
    })
    console.log(created)
    return newPatient
  }
  async addPatientPersonalData(dataPatientPersonalData:PatientPersonalDataType){
    const [ newPatientData,created ] = await ClinicPatientPersonalData.findOrCreate({
      where:{patient_id:dataPatientPersonalData.patient_id},
      defaults:dataPatientPersonalData
    })
    console.log(created)
    return newPatientData
  }  

  async listPatient(status:number){
    const patients = await ClinicPatientInformation.findAll({
      where:{status:status}
    })
    return patients
  }

  async searchPatients(params:string){
    const patients = await ClinicPatientInformation.findAll({
      where:{
        [Op.or]: [
          { name: { [Op.like]: `%${params}%` }},
          { id:   { [Op.like]: `%${params}%` }}
        ]
      }
    })
    return patients
  }


  async infoPatient(patientId:number){
    const info = await ClinicPatientInformation.findByPk(patientId)
    return info
  }
  async personalDataPatient(patientId:number){
    const info = await ClinicPatientPersonalData.findOne({
      where:{patient_id:patientId}
    })
    return info
  }

  async editPatient(patientId:number,dataPatient:PatientInformationType){
    await ClinicPatientInformation.update(dataPatient,{where:{id:patientId}})
    return true
  }
  async editPersonalDataPatient(patientId:number,dataPersonalData:PatientPersonalDataType){
    await ClinicPatientPersonalData.update(dataPersonalData,{where:{patient_id:patientId}})
    return true
  }

  async deletePatient(patientId:number){
    await ClinicPatientInformation.destroy({where:{id:patientId}})
    await ClinicPatientPersonalData.destroy({where:{patient_id:patientId}})
    return true
  }
    
}
export default new PatientService()