import { generateId } from "../utils/GenerateId.js";



export class CaseFile {
  constructor(data) {
    this.id = generateId()
    this.agency = data.agency
    this.details = data.details
    this.caseNumber = this.generateCaseNumber()
    this.createdAt = new Date() // there is something wrong here
    this.lastOpenedAt = new Date() // idk? something here will need to be updated
  }


  get ListTemplate() {
    return `case-${this.caseNumber}`
  }

  generateCaseNumber() {
    const number = this.id.slice(this.id.length - 4, this.id.length)
    switch (this.agency) {
      case 'XBI':
        return 'X-' + number + 'YZ'
      case 'UMB':
        return '☂️' + number + '🦍'
      case 'National Forest Service':
        return 'NFS[' + number + ']'
    }
  }
}