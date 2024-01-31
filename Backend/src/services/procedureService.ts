import { ProcedureType } from "../controllers/Dtos/procedure.dto"
import { Procedures } from "../models/Procedures"


class ProcedureService{
  async newProcedure(dataProcedure:ProcedureType){
    const [ newProcedure,created ] = await Procedures.findOrCreate({
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
    const procedures = await Procedures.findAll({
      where:{status:status}
    })
    return procedures
  }
  async infoProcedure(procedureId:number){
    const info = await Procedures.findByPk(procedureId)
    return info
  }
  async editProcedure(procedureId:number,dataProcedure:ProcedureType){
    await Procedures.update(dataProcedure,{where:{id:procedureId}})
    return true
  }
  async deleteProcedure(procedureId:number){
    await Procedures.destroy({where:{id:procedureId}})
    return true
  }
    
}
export default new ProcedureService()