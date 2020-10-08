

export const handleNavigation = (text) =>{
    switch(text){
        case "logout" : 
            this.props.navigation.navigate("Logout")
            break;
        
        case "profil" :
            this.props.navigation.navigate("MonProfil")
            break;
        
        case "document" :
            this.props.navigation.navigate("FileManager")
            break;

    }
}