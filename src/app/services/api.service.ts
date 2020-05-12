import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemInterface, VideoItemInterface, YoutubeResponseInterface } from '../interfaces/youtube.interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${environment.key}&maxResults=50&type=video&part=snippet&q=john`;

    constructor(private http: HttpClient) {
    }

    public getList(): Observable<ItemInterface[]> {

        return this.http.get(this.apiUrl)
            .pipe(
                map((res: YoutubeResponseInterface) => res.items),
                map((items: VideoItemInterface[]) => {
                        return items.map((item) => (
                            {
                                videoId: item.id.videoId,
                                thumbnails: item.snippet.thumbnails.default.url,
                                publishedAt: item.snippet.publishedAt,
                                title: item.snippet.title,
                                description: item.snippet.description
                            }
                        ));
                    }
                )
            );
    }
}
