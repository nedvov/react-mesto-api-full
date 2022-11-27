const emailPattern = new RegExp('^([A-z0-9_.-]{1,})' // user_name
+ '@'
+ '([A-z0-9_.-]{1,})' // server_name
+ '.'
+ '([A-z]{2,8})$'); // server_domain

const linkPattern = new RegExp('^(https?:\\/\\/)?' // protocol
+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
+ '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
+ '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
+ '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

module.exports = {
  emailPattern,
  linkPattern,
};
