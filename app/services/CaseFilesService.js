import { AppState } from "../AppState.js";



class CaseFilesService {
  selectActiveCase(caseId) {
    const selectedCaseFile = AppState.caseFiles.find(caseFile => caseFile.id == caseId)
    console.log('🐕‍🦺', caseId, selectedCaseFile);
    AppState.activeCaseFile = selectedCaseFile
    console.log(AppState);
  }

}

export const caseFilesService = new CaseFilesService()