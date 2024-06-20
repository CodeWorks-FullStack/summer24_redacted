import { CaseFile } from './models/CaseFile.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  caseFiles = [
    new CaseFile({
      agency: 'XBI',
      details: `Surveillance operation uncovered an unconventional business venture, designated 'Project K-9'. The enterprise is led by entities believed to be of extraterrestrial origin, hereafter referred to as 'Subjects E'.

Subjects E have initiated a commercial endeavor involving the distribution of genetically engineered canine variants. These new breeds exhibit unusual characteristics, such as enhanced longevity and low maintenance requirements, making them particularly appealing to the elderly demographic.

Primary consumers have been identified as senior citizens, colloquially referred to as 'grandmas'. Transactions are conducted under the guise of a standard pet adoption process. However, preliminary analysis suggests a secondary agenda, potentially involving the study of human-animal bonding and its effects on human emotional well-being.

Recommendation: Continue monitoring the 'Project K-9' initiative to determine the full scope of extraterrestrial involvement and assess any potential risks to the subjects involved or broader public safety concerns.

End of Report.`
    }),
    new CaseFile({
      agency: 'UMB',
      details: `
       Individuals, believed to originate from a future timeline, exhibited advanced knowledge of cultural trends and market demands.

      Subjects M's primary objective was the acquisition of a limited-edition merchandise, specifically 'Naruto Crocs', available exclusively at Footlocker retail outlets. The items in question were part of a time-sensitive promotional release, generating significant consumer interest.

The operation was executed with precision, suggesting premeditated intent to capitalize on the scarcity of the product. Subjects M successfully procured multiple units of the merchandise prior to stock depletion, avoiding temporal paradoxes.

Recommendation: Further investigation required to determine the implications of temporal commerce and its potential disruption to present-day economic structures. Monitoring of the Umbrella Corporation's activities to continue, with an emphasis on preventing exploitation of the rift.

End of Report.`
    }),
    new CaseFile({
      agency: 'National Forest Service',
      details: 'Some one left a bunch of trash in the woods. We have no idea who did it... Now we have to clean it up. We are requesting funding to do so.'
    })
  ]
}

export const AppState = createObservableProxy(new ObservableAppState())