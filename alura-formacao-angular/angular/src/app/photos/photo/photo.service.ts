import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const SERVER_API_URL = environment.serverApiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(userName: string) {
    return this.http
      .get<Photo[]>(`${SERVER_API_URL}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(`${SERVER_API_URL}/${userName}/photos`, { params });
  }

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(
      `${SERVER_API_URL}/photos/upload`,
      formData,
      {
        observe: 'events',
        reportProgress: true
      });
  }

  findById(photoId: number) {
    return this.http.get<Photo>(`${SERVER_API_URL}/photos/${photoId}`);
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(`${SERVER_API_URL}/photos/${photoId}/comments`);
  }

  addComments(photoId: number, commentText: string) {
    return this.http.post(`${SERVER_API_URL}/photos/${photoId}/comments`, { commentText });
  }

  removePhoto(photoId: number) {
    return this.http.delete(`${SERVER_API_URL}/photos/${photoId}`);
  }

  like(photoId: number) {
    return this.http
      .post(`${SERVER_API_URL}/photos/${photoId}/like`, {}, { observe: 'response' })
      .pipe(map(res => true))
      .pipe(catchError(err => {
        return err.status == '304' ? of(false) : throwError(err);
      }));
  }
}