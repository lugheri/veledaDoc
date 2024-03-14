import { ProcedureType } from "../controllers/Dtos/procedure.dto"
import { ClinicProcedures } from "../models/ClinicProcedures"


class ProcedureService{
  async newProcedure(dataProcedure:ProcedureType){
    const [ newProcedure,created ] = await ClinicProcedures.findOrCreate({
      where:{
        name:dataProcedure.name,
        clinic_id:dataProcedure.clinic_id,
        status:1
      },
      defaults:dataProcedure
    })
    console.log(created)
    return newProcedure
  }
  async listProcedures(status:number){
    const procedures = await ClinicProcedures.findAll({
      where:{status:status}
    })
    return procedures
  }
  async infoProcedure(procedureId:number){
    const info = await ClinicProcedures.findByPk(procedureId)
    return info
  }
  async editProcedure(procedureId:number,dataProcedure:ProcedureType){
    await ClinicProcedures.update(dataProcedure,{where:{id:procedureId}})
    return true
  }
  async deleteProcedure(procedureId:number){
    await ClinicProcedures.destroy({where:{id:procedureId}})
    return true
  }
    
}
export default new ProcedureService()