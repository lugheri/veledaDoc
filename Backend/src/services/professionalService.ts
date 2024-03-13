import { ProfessionalType } from "../controllers/Dtos/professional.dto"
import { Professionals } from "../models/ClinicProfessionals"

class ProfessionalService{
  async newProfessional(dataProfessional:ProfessionalType){
    const [ newProfessional,created ] = await Professionals.findOrCreate({
      where:{
        name:dataProfessional.name,
        clinic_id:dataProfessional.clinic_id,
        status:1
      },
      defaults:dataProfessional
    })
    console.log(created)
    return newProfessional
  }
  async listProfessional(status:number){
    const profissionals = await Professionals.findAll({
      where:{status:status}
    })
    return profissionals
  }
  async infoProfessional(professionalId:number){
    const info = await Professionals.findByPk(professionalId)
    return info
  }
  async editProfessional(professionalId:number,dataProfessional:ProfessionalType){
    await Professionals.update(dataProfessional,{where:{id:professionalId}})
    return true
  }
  async deleteProfessional(professionalId:number){
    await Professionals.destroy({where:{id:professionalId}})
    return true
  }
    
}
export default new ProfessionalService()