export class UpdateWatchHistory {
  videoId: string;
  duration: number;
}

/*
@Prop({ default: 0 })
  videosWatched: number;

  @Prop({ default: 0 })
  minutesWatched: number;

  @Prop([
    {
      video: { type: Types.ObjectId, ref: "Video" },
      watchedAt: { type: Date, default: Date.now },
      duration: { type: Number },
    },
  ])
  watchHistory: {
    video: Types.ObjectId;
    watchedAt: Date;
    duration: number;
  }[];
*/
