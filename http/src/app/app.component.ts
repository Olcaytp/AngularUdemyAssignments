// Between 1-92 lines are for the post.service.ts !!!!!!!!!!!!!!!!!!-------------

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs';
// import { Post } from './post.model';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   loadedPosts: Post[] = [];
//   isFetching = false;
//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchPosts();
//   }

//   onCreatePost(postData: { title: string; content: string }) {
//     // Send Http request
//     this.http
//       .post<{name: string}>(
//         'https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json',
//         postData
//       )
//       .subscribe(responseData => {
//         console.log(responseData);
//       });
//     // console.log(postData);
//   }

//   onFetchPosts() {
//     // Send Http request
//     this.fetchPosts();
//   }

//   onClearPosts() {
//     // Send Http request
//   }

//   private fetchPosts() {
//     this.isFetching = true; //because we starting the fetch
//     //firstly we cerated below lines to get postdatas from the server.

//     // this.http.get('https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json')
//     // .subscribe(posts => {
//     //   console.log(posts);
//     // });
//     // we used below codes for using RxJS operators for making our work easy.


//     //we assigned type to responseData to clearify responseData, so we created post.model.ts and used it

//     // this.http
//     //   .get('https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json')
//     //   .pipe(
//     //     map((responseData: {[key: string]: Post}) => {
//     //       const postsArray: Post[] = [];
//     //       for (const key in responseData) {
//     //         if (responseData.hasOwnProperty(key)) {
//     //           postsArray.push({ ...responseData[key], id: key });
//     //         }
//     //       }
//     //       return postsArray;
//     //     })
//     //   )

//     //here another easy way of typing is generic method.
//     this.http
//       .get<{ [key:string]: Post }>('https://ng-complete-guide-92605-default-rtdb.firebaseio.com/posts.json')
//       .pipe(
//         map(responseData => {
//           const postsArray: Post[] = [];
//           for (const key in responseData) {
//             if (responseData.hasOwnProperty(key)) {
//               postsArray.push({ ...responseData[key], id: key });
//             }
//           }
//           return postsArray;
//         })
//       )
//     .subscribe(posts => {
//         this.isFetching = false; // when fetching done
//         console.log("server posts");
//         console.log(posts);
//         this.loadedPosts = posts;
//       });
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    //our custom subscribe so we'll unsubscribed it on ngOndestroy()
    this.errorSub = this.postsService.fail.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe({
      next: posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: error => {
        this.isFetching = false;
        this.error = error.message;
        console.log("error is occured!")
      }
  });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe({
      next: posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: error => {
        this.isFetching = false;
        this.error = error.message;
        console.log("error is occured!")
        console.log(error);
      }
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
