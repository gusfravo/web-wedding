export let Urls: Array<{ code: string, url: string }> = [
  {
    code:'auth:login',
    url:"auth/login"
  },{
    code: "auth:user",
    url: "auth/user"
  },{
    code: "auth:logout",
    url: "auth/logout"
  },{
    code: "auth:logout",
    url: "auth/logout"
  },{
    code: "invitation:list",
    url: "invitation/list"
  },{
    code: "invitation:get",
    url: "invitation/get"
  },{
    code: "guests:findAllByInvitation",
    url: "guests/findAllByInvitation"
  },{
    code: "guests:update",
    url: "guests/update"
  },{
    code: "guests:get",
    url: "guests/get"
  },{
    code: "guests:findGuestByNameAndInvitation",
    url: "guests/findGuestByNameAndInvitation"
  },{
    code: "guests:opened",
    url: "guests/opened"
  },{
    code: "guests:confirmed",
    url: "guests/confirmed"
  }
];
