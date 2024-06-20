import { AppState } from "../AppState.js";
import { generateId } from "../utils/GenerateId.js";



// REVIEW start with your model, what do you need to store in the model for your app to work? you can always come back and update this later

export class CaseFile {
  constructor(data) {
    this.id = generateId()
    this.agency = data.agency
    this.details = data.details
    this.caseNumber = this.generateCaseNumber()
    //  is there a date already ? (yes) use that one : (no) create one
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date()
    this.lastOpenedAt = data.lastOpenedAt ? new Date(data.lastOpenedAt) : new Date()

    this.redacted = true
    // console.log('📃', this);
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

  // NOTE this is a big template it would be wise to build it in an HTML document so you can design with better code or intellisense, then move it here
  get ActiveTemplate() {
    return `
<div class="card rounded-0 shadow p-2 my-1">
  <div class="fw-bold">
    <h1><i class="mdi mdi-file-account"></i> ${this.caseNumber}</h1>
    <div class="text-secondary">
      <div><i class="mdi mdi-office-building"></i> Agency: ${this.agency}</div>
      <div><i class="mdi mdi-calendar-plus"></i> Created on: ${this.LongDate}</div>
      <div> <i class="mdi mdi-calendar-account"></i> Last Opened on: ${this.LongOpenedDate}</div>
    </div>
  </div>
  <hr />
  <form onsubmit="app.CaseFilesController.saveActiveNote()">
  <div class="text-end my-1">
    <button class="btn btn-warning" type="button" onclick="app.CaseFilesController.UnRedactCaseFile()"><i class="mdi mdi-eraser">${this.redacted ? 'Un-redact' : 'redact'}</i></button>
    <button class="btn btn-success" type="submit" ${this.redacted ? 'disabled' : ''} ><i class="mdi mdi-content-save">Save</i></button>
  </div>
  <textarea ${this.redacted ? 'disabled' : ''} class="w-100" name="details">
${this.redacted ? this.RedactedDetails : this.details}
  </textarea>
  </form>
</div>
`
  }

  // NOTE keep your dates as Date and create 'get' to display the formatted
  get ShortDate() {
    return this.createdAt.toLocaleDateString()
  }

  get LongDate() {
    return this.createdAt.toLocaleString('en-US', { month: 'long', day: 'numeric', weekday: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
  }

  get LongOpenedDate() {
    return this.lastOpenedAt.toLocaleString('en-US', { month: 'long', day: 'numeric', weekday: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: '2-digit' })
  }

  get RedactedDetails() {
    // NOTE this is DEFINITELY not part of your checkpoint. DO NOT USE THIS FOR REFERENCE
    let out = []
    this.details.split(' ').forEach(word => {
      if (AppState.redactedList.includes(word.toLowerCase()) || AppState.redactedList.includes(word.replace(/\.|\'|s|[^a-zA-Z]/ig, '').toLowerCase())) {
        out.push('⬛⬛⬛⬛')
      } else {
        out.push(word)
      }
    })
    return out.join(' ')
  }

  // NOTE also kinda cool but not at all something you would need for your checkpoint
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