import { ProfessionalType } from "../controllers/Dtos/professional.dto"
import { ClinicProfessionals } from "../models/ClinicProfessionals"

class ProfessionalService{
  async newProfessional(dataProfessional:ProfessionalType){
    const [ newProfessional ] = await ClinicProfessionals.findOrCreate({
      where:{
        name:dataProfessional.crm,
        clinic_id:dataProfessional.clinic_id,
        status:1
      },
      defaults:dataProfessional
    })
    return newProfessional.id
  }
  async listProfessional(accountId:number,status:number){
    const professionals = await ClinicProfessionals.findAll({
      where:{clinic_id:accountId,status:status}
    })
    return professionals
  }
  async infoProfessional(professionalId:number){
    const info = await ClinicProfessionals.findByPk(professionalId)
    return info
  }
  async editProfessional(professionalId:number,dataProfessional:ProfessionalType){
    await ClinicProfessionals.update(dataProfessional,{where:{id:professionalId}})
    return true
  }
  async deleteProfessional(professionalId:number){
    await ClinicProfessionals.destroy({where:{id:professionalId}})
    return true
  }
    
}
export default new ProfessionalService()