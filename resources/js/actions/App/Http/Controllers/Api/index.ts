import V1 from './V1'
import Admin from './Admin'
import SentimentAnalysisController from './SentimentAnalysisController'
import SmartSchedulingController from './SmartSchedulingController'
import SequenceController from './SequenceController'
import KnowledgeBaseController from './KnowledgeBaseController'
import AiAgentController from './AiAgentController'
import AiAgentCallController from './AiAgentCallController'
import WidgetController from './WidgetController'
import SearchController from './SearchController'
import NotificationController from './NotificationController'
import AiMessageController from './AiMessageController'

const Api = {
    V1: Object.assign(V1, V1),
    Admin: Object.assign(Admin, Admin),
    SentimentAnalysisController: Object.assign(SentimentAnalysisController, SentimentAnalysisController),
    SmartSchedulingController: Object.assign(SmartSchedulingController, SmartSchedulingController),
    SequenceController: Object.assign(SequenceController, SequenceController),
    KnowledgeBaseController: Object.assign(KnowledgeBaseController, KnowledgeBaseController),
    AiAgentController: Object.assign(AiAgentController, AiAgentController),
    AiAgentCallController: Object.assign(AiAgentCallController, AiAgentCallController),
    WidgetController: Object.assign(WidgetController, WidgetController),
    SearchController: Object.assign(SearchController, SearchController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    AiMessageController: Object.assign(AiMessageController, AiMessageController),
}

export default Api