import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Login from '../component/Login'
import SignUp from '../component/SignUp'
import ActiveAccount from '../component/ActiveAccount'
import Home from '../component/Home'
import Favorite from "../component/Favorite"
import Profile from "../component/Profile"
import Urgence from "../component/Urgence"
import Contact from "../component/Contact"
import  ContactList  from "../component/ContactList"
import Document from "../component/Document"
import DocumentMenu from "../component/DocumentMenu"
import DocumentDetail from "../component/DocumentDetail"
import Rappel from "../component/Rappel"
import RappelMenu from "../component/RappelMenu"
import RappelDetail from "../component/RappelDetail"
import Logout from "../component/Logout"
import RegisterDoctor from "../component/RegisterDoctor"
import SecondAdd from "../component/SecondAdd"
import SecondProfil from "../component/SeconProfil"
import Forgot from "../component/forgot"
import BaseProfile from "../component/BaseProfile"
import SecondBaseProfile from "../component/SecondBaseProfile"
import FicheMedicale from "../component/FicheMedicale"
import SecondFicheMedicale from "../component/SecondFicheMedicale"
import InfoPerso from "../component/InfoPerso"
import OtherProfile from "../Screens/Profiles/OtherProfile"
import SecondInfoPerso from "../component/SecondInfoPerso"


import Menu from "../Screens/Dashboard"
import ChoixAutoDiag from "../Screens/ChoixAutoDiag"
import WelcomeToDiag from "../Screens/WelcomeToDiag"
import AutoDiagnostique from "../Screens/AutoDiagnostique"
import DiagResult from "../Screens/DiagResult"
import MonProfil from "../Screens/Profiles/MonProfil"
import MyProfil from "../Screens/Profiles/MyProfil"
import MySante from "../Screens/Profiles/MySante"
import MySecondSante from "../Screens/Profiles/MySecondSante"
import MySecondProfil from "../Screens/Profiles/MySecondProfil"
import SwitchSecond from "../Screens/Profiles/SwitchSecond"
import FileManager from "../Screens/Documents/FileManager"
import Emergency from "../Screens/Emergency"
import Test from "../Screens/Documents/Test"
import Reminder from "../Screens/Rappel/Reminder"
import Switch from "../Screens/Profiles/Switch"
import MyContact from "../Screens/Contacts/MyContact"
import NewContact from "../Screens/Contacts/NewContact"
import ContactDetail from "../Screens/Contacts/ContactDetail"
import Event from "../Screens/Rappel/Event"
import AddEvent from "../Screens/Rappel/AddEvent"
import EventTraitement from "../Screens/Rappel/EventTraitement"
import RequireAuthentification from '../Helpers/requireAuth';


import Calendars from "../Screens/Rappel/Calendars"
const NavigationBest4Sante=createStackNavigator(
    {   

        Calendars : {
            screen : Calendars,
            navigationOptions : {
                title : "Calendar"
            }
        },
        Test : {
            screen : RequireAuthentification(Test),
            navigationOption : {
                title : "Test"
            }
        },
         Menu : {
             screen : RequireAuthentification(Menu),
             navigationOption : {
                 title : "Dashboard"
             }
         },
         ChoixAutoDiag : {
             screen : ChoixAutoDiag,
             navigationOption : {
                 title : "ChoixAutoDiag",
                 
             }
            
         },
         WelcomeToDiag : {
             screen : WelcomeToDiag,
             navigationOption : {
                 title : "Welcome"
             }
         },
         AutoDiagnostique : {
             screen : AutoDiagnostique,
             navigationOption : {
                 title : "AutoDiagnostique"
             }
         },
         DiagResult : {
             screen : DiagResult,
             navigationOption : {
                 title : "DiagResult"
             }
         },
         Switch : {
             screen : RequireAuthentification(Switch),
             navigationOption : {
                 title : "Switch"
             }
         },
         MonProfil : {
             screen :RequireAuthentification (MonProfil),
             navigationOption : {
                 title : "MonProfil"
             }
         },
         MyProfil : {
             screen : RequireAuthentification(MyProfil),
             navigationOption : {
                 title  :"MyProfil"
             }
         },
         MySante : {
             screen : RequireAuthentification(MySante),
             navigationOption : {
                 title : "MySante"
             }
         },
         MySecondSante : {
             screen : RequireAuthentification(MySecondSante),
             navigationOptions :{
                 title : "MySecondSante"
             }
             
         },
         MySecondProfil : {
             screen : RequireAuthentification(MySecondProfil),
             navigationOption : {
                 title : "MySecondProfil"
             }
         },
         SwitchSecond :{
             screen : RequireAuthentification(SwitchSecond),
             navigation : {
                 title : "SwitchSecond"
             }
         },
         FileManager : {
             screen : RequireAuthentification(FileManager),
             navigationOption :  {
                 title : "FileManager"
             }
         },
         Emergency : {
             screen : RequireAuthentification(Emergency),
             navigationOption : {
                 title : "Emergency"
             }
         },
         Reminder : {
             screen : RequireAuthentification(Reminder),
             navigationOption : {
                 title : "Reminder"
             }
         },
         Event : {
             screen  : Event,
             navigationOption:{
                 title : "Event"
             }
         },
         AddEvent : {
             screen : RequireAuthentification(AddEvent),
             navigationOption : {
                 title : "AddEvent"
             }
         },
         EventTraitement : {
             screen : EventTraitement,
             navigationOption : {
                 title : "EventTraitement"
             }
         },
         OtherProfile : {
             screen : OtherProfile,
             navigationOption : {
                 title : "OtherProfile"
             }
         },
         MyContact : {
             screen : RequireAuthentification(MyContact),
             navigationOption : {
                 title : "MyContact"
             }
         },
         NewContact : {
             screen : RequireAuthentification(NewContact),
             navigationOption : {
                 title : "NewContact"
             }
         },
         ContactDetail : {
             screen : ContactDetail,
             navigationOption : {
                 title : "ContactDetail"
             }
         },
        Login :{
            screen :Login,
            navigationOption:{
                title: 'Login'
            }
        },
        SignUp :{
            screen : SignUp,
            navigationOption:{
                title: 'SignUp'
            }
        },
        ActiveAccount :{
            screen : ActiveAccount,
            navigationOption:{
                title: 'ActiveAccount'
            }
        },
        Home :{
            screen : RequireAuthentification(Home),
            navigationOption:{
                title: 'Home'
            }
        },

        Favorite : {
            screen : RequireAuthentification(Favorite),
            navigationOption:{
                title: 'Favorite'
            }
        },
         Profile : {
             screen : Profile,
             navigationOption : {
                 title : "Profile"
             }
         },
         Urgence : {
             screen : Urgence,
             navigationOption : {
                 title : "Urgence"
             }
         },
         Contact : {
             screen : Contact,
             navigationOption : {
                 title : "Contact"
             }
         },
         ContactList : {
             screen : ContactList,
             navigationOption : {
                 title : ContactList
             }
         },
         Document : {
             screen : Document,
             navigationOption : {
                 title : "Document"
             }
         },
         DocumentMenu : {
             screen : DocumentMenu,
             navigationOption : {
                 title : "DocumentMenu"
             }
         },
         DocumentDetail : {
             screen : DocumentDetail,
             navigationOption : {
                 title : "DocumentDetail"
             }
         },
         Rappel : {
             screen : Rappel,
             navigationOption : {
                 title : "Rappel"
             }
         },
         RappelMenu : {
             screen : RappelMenu,
             navigationOption : {
                 title : "RappelMenu"
             }
         },
         RappelDetail : {
             screen : RappelDetail,
             navigationOption : {
                 title : "RappelDetail"
             }
         },
         Logout : {
             screen : Logout,
             navigationOption : {
                 title : "Logout"
             }
         },
         RegisterDoctor : {
             screen : RegisterDoctor,
             navigationOption : {
                 title : "RegisterDoctor"
             }
         },
         SecondAdd : {
             screen : SecondAdd,
             navigationOption : {
                 title : "SecondAdd"
             }
         },
         SecondProfil : {
             screen : SecondProfil,
             navigationOption : {
                 title : "SecondProfil"
             }
         },
         Forgot : {
             screen :RequireAuthentification(Forgot),
             navigationOption : {
                 title : "Forgot"
             }
         },
         BaseProfile : {
             screen : BaseProfile,
             navigationOption : {
                 title : "BaseProfile"
             }
         },
         SecondBaseProfile : {
            screen : SecondBaseProfile,
            navigationOption : {
                title : "SecondBaseProfile"
            }
        },
         FicheMedicale : {
             screen : FicheMedicale,
             navigationOption : {
                 title : "FicheMedicale"
             }
         },
         SecondFicheMedicale : {
             screen : SecondFicheMedicale,
             navigationOption : {
                 title : "SecondFicheMedicale"
             }
         },
         InfoPerso : {
             screen :InfoPerso,
             navigationOption: {
                 title : "InfoPerso"
             }
         },
         SecondInfoPerso : {
             screen : SecondInfoPerso,
             navigationOption : {
                 title : "SecondInfoPerso"
             }
         }
    },{
        initialRouteName : "Login",
        headerMode: 'none'}
)
export default createAppContainer(NavigationBest4Sante)
