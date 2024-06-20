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
    return `
<div class="row border-bottom border-dark selectable text-primary" onclick="app.CaseFilesController.selectActiveCase('${this.id}')">
  <div class="col fw-bold text-dark">${this.caseNumber}</div>
  <div class="col text-end text-dark" title="case created on ${this.LongDate}"><i class="mdi mdi-calendar"></i> ${this.ShortDate}
  </div>
</div>
`
  }

  get ActiveTemplate() {
    return `
<div class="card rounded-0 shadow p-2 my-1">
  <div class="fw-bold">
    <h1><i class="mdi mdi-file-account"></i> ${this.caseNumber}</h1>
    <div class="text-secondary">
      <div><i class="mdi mdi-office-building"></i> Agency: ${this.agency}</div>
      <div><i class="mdi mdi-calendar-plus"></i> Created on: ${this.LongDate}</div>
      <div> <i class="mdi mdi-calendar-account"></i> Last Opened on: FIXME</div>
    </div>
  </div>
  <hr />
  <textarea>
${this.details}
  </textarea>
</div>
`
  }

  get ShortDate() {
    return this.createdAt.toLocaleDateString()
  }

  get LongDate() {
    return this.createdAt.toLocaleString('en-US', { month: 'long', day: 'numeric', weekday: 'long', year: 'numeric' })
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