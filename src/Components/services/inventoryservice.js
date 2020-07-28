import http from '../http-common';
class ManagementService {
    getAll(){
        return http.get("/tutorials");
    }
    getAllcust(){
      return http.get("/tutorials/customer");
    }
    createCustomer(data)
    {
      return http.post("/tutorials/customer", data);

    }
    create(data) {
       return http.post("/tutorials", data);
      }
    
     update(id, data) {
       return http.put(`/tutorials${id}`, data);
      }
    
     delete(id) {
        return http.delete(`/tutorials${id}`);
      }
    
      deleteAll() {
        return http.delete(`/tutorials`);
      }
    
     findByTitle(Productname) {
       return http.get(`/tutorials?Productname=${Productname}`);
      }
      findByTitles(Customername) {
        return http.get(`/tutorials/customer?Customername=${Customername}`);
       }
      findByDate(Date) {
        return http.get(`/tutorials/customer?Currentdate=${Date}`);
       }
    }
    
    export default new ManagementService();

