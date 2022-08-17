import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';




@Injectable({ providedIn: 'root' })
export class PostsService {
  fail = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          //there different types of observer type, body, response or events
          observe: 'response'
        }
      )
      .subscribe({
        next: responseData => {
          // console.log("responseData: ");
          console.log(responseData);
          // console.log("PostData: ");
          // console.log(postData);
        },
        error: error => {
          this.fail.next(error.message);
        }
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello:=)'}),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // Send to analytics server
          return throwError(()=> errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json', {
        observe: 'events'
        })
        .pipe(
          tap(event => {
            console.log(event);
            //there are different types of HttpEventType
            // if(event.type === HttpEventType.Sent) {
            //   console.log(event.type);
            // }
            if(event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          })
        );
  }

}
