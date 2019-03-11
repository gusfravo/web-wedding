import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from './server-url';
import { Urls } from './api/request-url';


// Urls de petición al backend
let urls = Urls;

// Hostname del backend
let server_url = SERVER_URL;

@Injectable()
export class SessionService {
  private isUserLoggedIn;
  private token;
  private tokenType;
  private expiresAt;
  private sessionModel = {
    user: {
      id: "",
      name: "",
      email: "",
      email_verified_at: false,
    },
    object: {
      id:''
    },
    objects:[]
  }
  private session = JSON.parse(JSON.stringify(this.sessionModel));



  constructor(protected http: Http) {
    this.isUserLoggedIn = false;
    this.token = '';
    this.tokenType = '';
    this.expiresAt = 0;
  }

  private setLoggedIn(object) {
    // Instanciamos el backend para obtener los datos de sesión e inicializamos el objeto publico
    this.isUserLoggedIn = true;
    this.token = object.access_token;
    this.tokenType = object.token_type;
    this.expiresAt = object.expires_at;
    // this.expiresAt =(parseInt(object.expires_in) * 1000) + new Date().getTime();
    sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn);
    sessionStorage.setItem('token', this.token);
    sessionStorage.setItem('tokenType', this.tokenType);
    sessionStorage.setItem('expiresAt', this.expiresAt);
  }
  private setLoggout() {
    this.isUserLoggedIn = false;
    this.token = '';
    this.tokenType = '';
    this.expiresAt = [];
    this.session = JSON.parse(JSON.stringify(this.sessionModel));
    sessionStorage.setItem('session',JSON.stringify(this.session));
    sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn);
    sessionStorage.setItem('token', this.token);
    sessionStorage.setItem('tokenType', this.tokenType);
    sessionStorage.setItem('expiresAt', this.expiresAt);
  }

  private setSession(object:any) {
    this.session.user = object;
    // this.session.objects = object.objects;
    // this.session.object = object.object;
    sessionStorage.setItem('session',JSON.stringify(this.session));
  }

  getLoggedIn() {
    return this.isUserLoggedIn;
  }

  getSession() {
    return this.session;
  }

  login(object) {
    let parameters = {
      email: object.username,
      password: object.password,
      remember_me: object.remember_me
    };
    let headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With':'XMLHttpRequets' });
    let options: RequestOptionsArgs = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers,
    });
    return new Promise(resolve => {
      this.http.post(server_url + this.getUrl('auth:login'),parameters, options)
        .subscribe((data:any) => {
          // console.log(data);
          if (data.ok === true) {
            this.setLoggedIn(JSON.parse(data._body));
            headers.append("Authorization", this.tokenType + " " + this.token);
            options.method = RequestMethod.Get;
            this.http.get(server_url + this.getUrl('auth:user'), options)
              .subscribe((data:any) => {
                if (data.ok === true) {
                  this.setSession(JSON.parse(data._body));
                  resolve({transaction: 'ok', object: this.getSession()});
                }
              }, error => {
                console.log("Error: ", error);
                resolve(error);
              });
          } else {
            resolve({transaction: 'ok', object: {}});
          }
        }, error => {
          console.log("Error: ", error);
          resolve(error);
        });
    });
  }

  logout(){
    return new Promise((resolve)=>{
      let headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With':'XMLHttpRequets' });
      let options: RequestOptionsArgs = new RequestOptions({
        method: RequestMethod.Get,
        headers: headers,
      });
      headers.append("Authorization", this.tokenType + " " + this.token);
      this.http.get(server_url + this.getUrl('auth:logout'), options)
        .subscribe((data:any) => {
          if (data.ok === true) {
            this.isUserLoggedIn = false;
            this.setLoggout();
            resolve(true);
            resolve({transaction: 'ok', message:'Session terminada.'});
          }
        }, error => {
          console.log("Error: ", error);
          resolve(error);
        });

    })
  }


  /*
  * funcion para ejecutar petioones
  */
  // funcion para realizar peticiones POST
  postRequest(code:string,object:any):Observable<Response> {
    //buscamos el code en el compendio de urls
    let codeUrl = urls.find(x => x.code == code);
    //variable que contendra el path a llamar por el http metodo get
    let path = "";
    if(codeUrl != undefined){
      return Observable.create(observer=>{
        path = server_url + codeUrl.url;
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", this.tokenType + " " + this.token);
        let options: RequestOptionsArgs = new RequestOptions({
          method: RequestMethod.Post,
          headers: headers,
        });
        // mandamos a llamar el servicio http para hacer peticion GET.
        this.http.post(path , object , options)
        .subscribe((response:Response)=>{
          let res = response.json();
          if(res.transaction == 'ok'){
            console.log("Request :: ", path);
            observer.next(res);
            observer.complete();
          }else{
            observer.error(res);
          }
        },
        error =>{
          observer.error(error);
        });
      });
    }else{
      throw new Error('La URL no existe:' + code);
    }
  }
  /*
  * funcion para ejecutar petioones
  */
  // funcion para realizar peticiones POST
  postRequestAnonimus(code:string,object:any):Observable<Response> {
    //buscamos el code en el compendio de urls
    let codeUrl = urls.find(x => x.code == code);
    //variable que contendra el path a llamar por el http metodo get
    let path = "";
    if(codeUrl != undefined){
      return Observable.create(observer=>{
        path = server_url + codeUrl.url;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options: RequestOptionsArgs = new RequestOptions({
          method: RequestMethod.Post,
          headers: headers,
        });
        // mandamos a llamar el servicio http para hacer peticion GET.
        this.http.post(path , object , options)
        .subscribe((response:Response)=>{
          let res = response.json();
          if(res.transaction == 'ok'){
            console.log("Request :: ", path);
            observer.next(res);
            observer.complete();
          }else{
            observer.error(res);
          }
        },
        error =>{
          observer.error(error);
        });
      });
    }else{
      throw new Error('La URL no existe:' + code);
    }
  }

  /**
  * Función para obtener la url de consulta del backend
  */
  getUrl(code: string) {
    //buscamos el code en el compendio de urls
    let url = urls.find(x => x.code == code);

    //variable que contendra el path a llamar por el http metodo get
    if (url === undefined) {
      console.log('Error: La url que desea accesar no esta definida');
    } else {
      return url.url;
    }
  }

  /**
   * Función que codifica los datos que se envian al backend
   */
  // private encodeFormData(obj, encode) {
  //   if (!encode) {
  //     var stringyFy = JSON.stringify(obj);
  //     stringyFy = stringyFy.replace(/&/g, '#amp;');
  //     return stringyFy;
  //   }
  //   var query = '';
  //   var name, value, fullSubName, subName, subValue, innerObj, i;
  //   for (name in obj) {
  //     value = obj[name];
  //     if (value instanceof Array) {
  //       for (i = 0; i < value.length; ++i) {
  //         subValue = value[i];
  //         fullSubName = name + '[' + i + ']';
  //         innerObj = {};
  //         innerObj[fullSubName] = subValue;
  //         query += this.encodeFormData(innerObj, undefined) + '&';
  //       }
  //     }
  //     else if (value instanceof Object) {
  //       for (subName in value) {
  //         subValue = value[subName];
  //         fullSubName = name + '[' + subName + ']';
  //         innerObj = {};
  //         innerObj[fullSubName] = subValue;
  //         query += this.encodeFormData(innerObj, undefined) + '&';
  //       }
  //     }
  //     else if (value !== undefined && value !== null) {
  //       query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  //     }
  //   }
  //   return query.length ? query.substr(0, query.length - 1) : query;
  // };

  realodSession(){
    return new Promise((resolve)=>{
      this.isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');
      this.token = sessionStorage.getItem('token');
      this.tokenType = sessionStorage.getItem('tokenType');
      this.expiresAt = sessionStorage.getItem('expiresAt');
      this.session = JSON.parse(sessionStorage.getItem('session'));
      if( this.isUserLoggedIn != null && this.token != null && this.tokenType != null && this.expiresAt != null && this.session != null && this.session.object != null ){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  }

}
