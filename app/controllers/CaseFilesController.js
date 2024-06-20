import { AppState } from "../AppState.js";
import { setHTML } from "../utils/Writer.js";




export class CaseFilesController {
  constructor() {
    console.log('🕴️📂🎮');
    this.drawCaseFilesList()
  }

  drawCaseFilesList() {
    const caseFiles = AppState.caseFiles
    let listHTML = ''
    caseFiles.forEach(caseFile => listHTML += caseFile.ListTemplate)
    setHTML('case-file-list', listHTML)
  }
}