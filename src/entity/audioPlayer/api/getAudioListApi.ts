const trackList = ["allthat.mp3", "creativeminds.mp3", "dreams.mp3", "hey.mp3"];

export const getAudioListApi = async () => {
  try {
    return await new Promise<typeof trackList>((res) =>
      setTimeout(() => res(trackList), 500)
    );
  } catch (error) {
    console.log(error);
  }
};
