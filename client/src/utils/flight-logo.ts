// Mapping of airline names to their logo paths
const airlineLogos: { [key: string]: string } = {
    "FLYNAS":"https://1000logos.net/wp-content/uploads/2023/05/Flynas-Logo.png",
    "EGYPTAIR":"https://1000logos.net/wp-content/uploads/2023/05/EgyptAir-Logo.png",
    "AMERICAN AIRLINES": "https://1000logos.net/wp-content/uploads/2023/05/American-Airlines-Logo.png",
    "BRITISH AIRWAYS": "https://1000logos.net/wp-content/uploads/2023/05/British-Airways-Logo.png",
    "EMIRATES": "https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png",
    "QATAR AIRWAYS": "https://1000logos.net/wp-content/uploads/2020/03/Qatar-Airways-Logo.png",
    "LUFTHANSA": "https://1000logos.net/wp-content/uploads/2017/03/Logo-Lufthansa.png",
    "AIR FRANCE": "https://1000logos.net/wp-content/uploads/2020/03/Air-France-Logo.png",
    "KUWAIT AIRWAYS": "https://1000logos.net/wp-content/uploads/2021/04/Kuwait-Airways-logo.png",
    "GULF AIR":"https://1000logos.net/wp-content/uploads/2021/04/Gulf-Air-logo.png",
    "ROYAL JORDANIAN":"https://1000logos.net/wp-content/uploads/2021/02/Royal-Jordanian-logo.png",
    "AJET":"https://1000logos.net/wp-content/uploads/2021/02/Air-Jet-logo.png",
    "TURKISH AIRLINES":"https://1000logos.net/wp-content/uploads/2020/04/Turkish_Airlines_logo.png",
    "AEGEAN AIRLINES":"https://1000logos.net/wp-content/uploads/2021/04/Aegean-Airlines-logo.png",
    "LOT POLISH AIRLINES":"https://1000logos.net/wp-content/uploads/2023/05/LOT-Polish-Airlines-Logo.png",
    "SUNEXPRES":"https://1000logos.net/wp-content/uploads/2023/05/SunExpress-Logo.png",
    "VUELING AIRLINES":"https://upload.wikimedia.org/wikipedia/commons/b/b8/Logo_Vueling.svg",
    "PEGASUS AIRLINES":"https://1000logos.net/wp-content/uploads/2023/05/Pegasus-Airlines-Logo.png",
    "KM MALTA AIRLINES":"https://static.routesonline.com/images/cached/organisation-2796-scaled-300x130.png",
    "TAP PORTUGAL":"https://1000logos.net/wp-content/uploads/2019/12/0011_TAP-Portugal-Logo.jpg",
    "IBERIA":"https://1000logos.net/wp-content/uploads/2021/04/Iberia-logo.png",
    "JETBLUE AIRWAYS":"https://1000logos.net/wp-content/uploads/2019/12/JetBlue-Airways-Logo.png",
    "ITA AIRWAYS":"https://1000logos.net/wp-content/uploads/2023/06/ITA-Airways-Logo.png",
    "SAUDI ARABIAN AIRLINES":"https://1000logos.net/wp-content/uploads/2021/04/Saudi-Arabian-Airlines-logo.png",
    "SWISS INTERNATIONAL AIR LINES":"https://1000logos.net/wp-content/uploads/2021/04/Swiss-International-Air-Lines-logo.png",
    "AUSTRIAN AIRLINES":"https://1000logos.net/wp-content/uploads/2020/04/Austrian-Airlines-Logo.png",
    "ETIHAD AIRWAYS":"https://1000logos.net/wp-content/uploads/2020/04/Etihad-Airways-Logo.png",
    "AIR EUROPA":"https://1000logos.net/wp-content/uploads/2020/10/Air-Europa-Logo.png",
  };
  
  // Function to retrieve the airline logo path by name
  export const getAirlineLogo = (airlineName: string) => {
    return (
      airlineLogos[airlineName] || "NA" 
    );
  };
  
 
  export default airlineLogos;