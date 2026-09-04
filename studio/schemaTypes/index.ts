import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'
import {localeMarkdown} from './objects/localeMarkdown'
import {customField} from './objects/customField'
import {propertyDocument} from './objects/propertyDocument'
import {siteSettings} from './documents/siteSettings'
import {siteContent} from './documents/siteContent'
import {region} from './documents/region'
import {opportunity} from './documents/opportunity'
import {insight} from './documents/insight'
import {siteDocument} from './documents/document'
import {activityLog} from './documents/activityLog'

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  localeMarkdown,
  customField,
  propertyDocument,
  // Documents
  siteSettings,
  siteContent,
  region,
  opportunity,
  insight,
  siteDocument,
  activityLog,
]
