const config = {
  imageServiceBaseUrl:
    "https://bjssacademyhackday-a8fqfwapbxfpa4b5.uksouth-01.azurewebsites.net",
  teamName: "atari",


  imageServiceUrl: function () {
    return `${config.imageServiceBaseUrl}/IL/teams/${config.teamName}/files`;
  },

  textServiceUrl: function () {
    return ``;
  }
};

export default config;
