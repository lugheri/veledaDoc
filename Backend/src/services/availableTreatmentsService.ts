import { AvailableTreatmentsType } from "../controllers/Dtos/availableTreatment.dto";
import { SysAvailableTreatments } from "../models/SysAvailableTreatments";

class AvailableTreatmentsService{
  async newTreatment(dataTreatment:AvailableTreatmentsType){
    const [ newTreatment,created ] = await SysAvailableTreatments.findOrCreate({
      where:{name:dataTreatment.name,status:1},
      defaults:dataTreatment
    })
    console.log(created)
    return newTreatment
  }
  async listTreatment(status:number){
    const treatments = await SysAvailableTreatments.findAll({
      where:{status:status}
    })
    return treatments
  }
  async infoTreatment(treatmentId:number){
    const info = await SysAvailableTreatments.findByPk(treatmentId)
    return info
  }
  async editTreatment(treatmentId:number,dataTreatment:AvailableTreatmentsType){
    await SysAvailableTreatments.update(dataTreatment,{where:{id:treatmentId}})
    return true
  }
  async deleteTreatment(treatmentId:number){
    await SysAvailableTreatments.destroy({where:{id:treatmentId}})
    return true
  }
    
}
export default new AvailableTreatmentsService()