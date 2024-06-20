import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { setHTML } from "../utils/Writer.js";




export class CaseFilesController {
  constructor() {
    console.log('🕴️📂🎮', AppState);
    this.drawCaseFilesList()
    // this.drawActiveCaseFile() // can't draw active casefile when page loads, cause there isn't one (null in AppState)
    AppState.on('activeCaseFile', this.drawActiveCaseFile)
  }

  drawCaseFilesList() {
    const caseFiles = AppState.caseFiles
    let listHTML = ''
    caseFiles.forEach(caseFile => listHTML += caseFile.ListTemplate)
    setHTML('case-file-list', listHTML)
  }

  drawActiveCaseFile() {
    const activeCaseFile = AppState.activeCaseFile
    let activeHTML = activeCaseFile.ActiveTemplate
    setHTML('active-case-file', activeHTML)
  }

  selectActiveCase(caseId) {
    console.log('👉📁', caseId);
    caseFilesService.selectActiveCase(caseId)
  }
}