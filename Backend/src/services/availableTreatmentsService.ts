import { AvailableTreatmentsType } from "../controllers/Dtos/availableTreatment.dto";
import { AvailableTreatments } from "../models/SysAvailableTreatments";

class AvailableTreatmentsService{
  async newTreatment(dataTreatment:AvailableTreatmentsType){
    const [ newTreatment,created ] = await AvailableTreatments.findOrCreate({
      where:{name:dataTreatment.name,status:1},
      defaults:dataTreatment
    })
    console.log(created)
    return newTreatment
  }
  async listTreatment(status:number){
    const treatments = await AvailableTreatments.findAll({
      where:{status:status}
    })
    return treatments
  }
  async infoTreatment(treatmentId:number){
    const info = await AvailableTreatments.findByPk(treatmentId)
    return info
  }
  async editTreatment(treatmentId:number,dataTreatment:AvailableTreatmentsType){
    await AvailableTreatments.update(dataTreatment,{where:{id:treatmentId}})
    return true
  }
  async deleteTreatment(treatmentId:number){
    await AvailableTreatments.destroy({where:{id:treatmentId}})
    return true
  }
    
}
export default new AvailableTreatmentsService()