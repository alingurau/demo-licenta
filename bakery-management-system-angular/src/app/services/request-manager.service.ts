import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { DummyClients } from '../dummy/clients';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestManager {

  dummyClients = new DummyClients();

  constructor(
    private http: HttpClient
  ) { }

  // AUTH REQUESTS

  loginUser(email: string, password: string): Observable<any> {
    const data = {
      'username': email,
      'password': password
    };
    return this.http.post(`${environment.API_URL}/sign-in`, data);
  }


  logoutUser(token: string): Observable<any> {
    // TODO: Call backend to delete hash
    return new Observable<any>((observer: Observer<any>) => {
      observer.next({status: 1});
      observer.complete();
    });
  }

  loadUser(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/user/${id}`);
  }

  updateUser(userEntity: any, password?: any): Observable<any> {
    const data = userEntity;
    data.changePassword = {};

    if (password) {
      data.changePassword = password;
    }
    delete data.password;
    return this.http.patch(`${environment.API_URL}/user/${userEntity.id}`, data);
  }

  createUser(userEntity: any, password: any): Observable<any> {
    const data = userEntity;
    data.changePassword = password;

    return this.http.post(`${environment.API_URL}/user`, data);
  }

  // ==========================================================================

  // SuperUser

  getSuperUserList(): Observable<any> {
    return this.http.post(`${environment.API_URL}/user/listSuperUserByTerm`, {term: ''});
  }

  getSuperUserFiltered(term: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/user/listSuperUserByTerm`, {term: term});
  }

  deleteSuperUser(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/user/${id}`);
  }
  // ==========================================================================

  // CLIENT

  getClientsList(superUserID: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/client/listByUserId/${superUserID}`).map((data: any[]) => {
      for (const d of data) {
        if (typeof d.userId === 'object') {
          d.userId = d.userId.id;
        }
      }
      return data;
    });
  }

  getClient(clientID: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/client/${clientID}`).map((data: any) => {

      if (typeof data.userId === 'object') {
        data.userId = data.userId.id;
      }

      return data;
    });
  }

  createClient(client: any): Observable<any> {
    const data = {... client};

    if (typeof data.userId !== 'object') {
      data.userId = { id: data.userId };
    }

    return this.http.post(`${environment.API_URL}/client`, data);
  }

  updateClient(client: any, id: number): Observable<any> {
    const data = {... client};

    if (typeof data.userId !== 'object') {
      data.userId = { id: data.userId };
    }

    return this.http.patch(`${environment.API_URL}/client/${id}`, data);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/client/${id}`);
  }
  // ==========================================================================

  // ROLES

  getRoles() {
    return new Observable<any>((observer: Observer<any>) => {
      const dummyRoles = {
        'ADMIN': 1,
        'SUPERUSER': 2
      };
      observer.next(dummyRoles);
      observer.complete();
    });
  }

   // ==========================================================================

   getOrdersLists(userId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/order/listByUserId/${userId}`).map((data: any[]) => {
      for (const d of data) {
        if (typeof d.userId === 'object') {
          d.userId = d.userId.id;
        }
      }
      return data;
    });
   }

   updateOrder(order: any, id: number): Observable<any> {
    const data = {... order};

    if (typeof data.userId !== 'object') {
      data.userId = { id: data.userId };
    }

    return this.http.patch(`${environment.API_URL}/order/${id}`, data);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/order/${id}`);
  }

  getOrdersList(userId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/client/listByUserId/${userId}`).map((data: any[]) => {
      for (const d of data) {
        if (typeof d.userId === 'object') {
          d.userId = d.userId.id;
        }
      }
      return data;
    });
  }

  getOrder(orderId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/client/${orderId}`).map((data: any) => {

      if (typeof data.userId === 'object') {
        data.userId = data.userId.id;
      }

      return data;
    });
  }

  createOrder(order: any): Observable<any> {
    const data = {... order};

    if (typeof data.userId !== 'object') {
      data.userId = { id: data.userId };
    }

    return this.http.post(`${environment.API_URL}/order`, data);
  }

  getAllOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/order/listByUserId/${userId}`);
  }

  getOrdersByClientId(clientID: number): Observable<any>  {
    return this.http.get(`${environment.API_URL}/order/listByClientId/${clientID}`);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${environment.API_URL}/order/list`);
  }

  getRecipes(): Observable<any> {
    return this.http.get(`${environment.API_URL}/recipe/listAll`);
  }

  getRecipe(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/recipe/${id}`).map((data: any) => {

      if (typeof data.userId === 'object') {
        data.userId = data.userId.id;
      }

      return data;
    });
  }

  createRecipe(recipe: any): Observable<any> {
    const data = {... recipe};

    if (typeof data.userId !== 'object') {
      data.userId = { id: data.userId };
    }

    return this.http.post(`${environment.API_URL}/recipe`, data);
  }

  updateRecipe(recipe: any, id: number): Observable<any> {
    const data = {... recipe};

    if (typeof data.userId !== 'object') {
      data.userId = { id: data.userId };
    }

    return this.http.patch(`${environment.API_URL}/recipe/${id}`, data);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/recipe/${id}`);
  }

  createIngredient(ingredient: any): Observable<any> {
    const data = {... ingredient};

    return this.http.post(`${environment.API_URL}/ingredient`, data);
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${environment.API_URL}/ingredient/listAll`);
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/ingredient/${id}`);
  }

  getIngredient(ingredientID: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/ingredient/${ingredientID}`);
  }

  updateIngredient(ingredient: any, id: number): Observable<any> {
    const data = {... ingredient};

    return this.http.patch(`${environment.API_URL}/ingredient/${id}`, data);
  }

  getIngredientsByRecipeId(recipeId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/ingredient/listByRecipeId/${recipeId}`);
  }
}
