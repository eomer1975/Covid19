import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Observable } from 'rxjs';

abstract class ServiceBase {
  public headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "X-Custom-Header",
  };

  constructor(private http: HttpClient) {}

  basePath = "";

  public HandleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return new Observable(
      (error && (<any>error).Message) ||
        "Something bad happened; please try again later."
    );
  }

  get(
    url: string,
    mothod: string = "GET",
    headers = null,
    data = null
  ): Promise<any> {
    let obs;
    if (url.indexOf("https://") < 0) {
      switch (mothod) {
        case "GET":
          obs = this.http.get("../" + this.basePath + url);
          break;
        case "POST":
          data = !!data ? data : {};
          obs = this.http.post("../" + this.basePath + url, data);
          break;
        case "PUT":
          data = !!data ? data : {};
          obs = this.http.put("../" + this.basePath + url, data);
          break;
      }
    } else {
      obs = this.http.get(url);
    }
    const res = obs.pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    return res.toPromise();
  }
}

export { ServiceBase };
