export interface YoutubeResponseInterface {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: PageInfoInterface;
    items: VideoItemInterface[];
}

export interface VideoItemInterface {
    kind: string;
    etag: string;
    id: IdInterface;
    snippet: SnippetInterface;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
}

interface IdInterface {
    kind: string;
    videoId: string;
}

interface SnippetInterface {
    publishedAt: string;
    channelId: string;
    thumbnails: ThumbnailsInterface;
    title: string;
    description: string;
}

interface ThumbnailsInterface {
    default: ThumbnailsDataInterface;
    medium: ThumbnailsDataInterface;
    high: ThumbnailsDataInterface;
}

interface PageInfoInterface {
    totalResults: number;
    resultsPerPage: number;
}

interface ThumbnailsDataInterface {
    url: string;
    width: number;
    height: number;
}

export interface ItemInterface {
    videoId: string;
    thumbnails: string;
    publishedAt: string;
    title: string;
    description: string;
    link?: string;
}
