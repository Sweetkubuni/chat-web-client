import {
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  Track,
  RoomEvent,
  VideoPresets
} from 'livekit-client';

let currentRoom: Room | undefined;

const state = {
  isFrontFacing: false,
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  defaultDevices: new Map<MediaDeviceKind, string>(),
  bitrateInterval: undefined as any,
};

enum DataPacket_Kind {
  RELIABLE = 0,
  LOSSY = 1,
  UNRECOGNIZED = -1,
}

class LiveKitHelper {
  private serverUrl: string;
  private apiKey: string;
  private apiSecret: string;

  constructor(serverUrl: string, apiKey: string, apiSecret: string) {
    this.serverUrl = serverUrl;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    // ------------------------------------------------------------------------------------------------


    // // publish local camera and mic tracks
    // await room.localParticipant.enableCameraAndMicrophone();


  }

  async connectToRoom(
    url: string,
    token: string
  ) {

    const roomOpts: RoomOptions = {
      // adaptiveStream,
      // dynacast,
      publishDefaults: {
        // simulcast,
        videoSimulcastLayers: [VideoPresets.h90, VideoPresets.h216],
        videoCodec: 'vp8',
      },
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    };

    const connectOpts: RoomConnectOptions = {
      autoSubscribe: true,
    };
    // if (forceTURN) {
    //   connectOpts.rtcConfig = {
    //     iceTransportPolicy: 'relay',
    //   };
    // }
    const room = new Room(roomOpts);

    // startTime = Date.now();
    await room.prepareConnection(url);
    // const prewarmTime = Date.now() - startTime;
    // console.log(`prewarmed connection in ${prewarmTime}ms`);

    room
      // .on(RoomEvent.ParticipantConnected, participantConnected)
      // .on(RoomEvent.ParticipantDisconnected, participantDisconnected)
      // .on(RoomEvent.DataReceived, this.handleData)
      // .on(RoomEvent.Disconnected, handleRoomDisconnect)
      .on(RoomEvent.TrackSubscribed, this.handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, this.handleTrackUnsubscribed)
      .on(RoomEvent.ActiveSpeakersChanged, this.handleActiveSpeakerChange)
      .on(RoomEvent.Disconnected, this.handleDisconnect)
      .on(RoomEvent.Reconnecting, () => console.log('Reconnecting to room'))
      .on(RoomEvent.Reconnected, async () => {
        // console.log(
        //   'Successfully reconnected. server',
        //   await room.engine.getConnectedServerAddress(),
        // );
      })
      .on(RoomEvent.LocalTrackPublished, (pub) => {
        const track = pub.track as LocalAudioTrack;

        // if (track instanceof LocalAudioTrack) {
        //   const { calculateVolume } = createAudioAnalyser(track);

        //   setInterval(() => {
        //     $('local-volume')?.setAttribute('value', calculateVolume().toFixed(4));
        //   }, 200);
        // }
        // renderParticipant(room.localParticipant);
        // updateButtonsForPublishState();
        // renderScreenShare(room);
      })
      // .on(RoomEvent.LocalTrackUnpublished, () => {
      //   renderParticipant(room.localParticipant);
      //   updateButtonsForPublishState();
      //   renderScreenShare(room);
      // })
      .on(RoomEvent.RoomMetadataChanged, (metadata) => {
        // console.log('new metadata for room', metadata);
      })
      // .on(RoomEvent.MediaDevicesChanged, handleDevicesChanged)
      .on(RoomEvent.AudioPlaybackStatusChanged, () => {
        // if (room.canPlaybackAudio) {
        //   $('start-audio-button')?.setAttribute('disabled', 'true');
        // } else {
        //   $('start-audio-button')?.removeAttribute('disabled');
        // }
      })
      // .on(RoomEvent.MediaDevicesError, (e: Error) => {
      //   const failure = MediaDeviceFailure.getFailure(e);
      //   console.log('media device failure', failure);
      // })
      .on(
        RoomEvent.ConnectionQualityChanged,
        (quality: ConnectionQuality, participant?: Participant) => {
          // console.log('connection quality changed', participant?.identity, quality);
        },
      )
      .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
        // console.log('subscribed to track', pub.trackSid, participant.identity);
        // renderParticipant(participant);
        // renderScreenShare(room);
      })
      .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
        // console.log('unsubscribed from track', pub.trackSid);
        // renderParticipant(participant);
        // renderScreenShare(room);
      })
      .on(RoomEvent.SignalConnected, async () => {
        // const signalConnectionTime = Date.now() - startTime;
        // console.log(`signal connection established in ${signalConnectionTime}ms`);
        // // speed up publishing by starting to publish before it's fully connected
        // // publishing is accepted as soon as signal connection has established
        // if (shouldPublish) {
        //   await room.localParticipant.enableCameraAndMicrophone();
        //   console.log(`tracks published in ${Date.now() - startTime}ms`);
        //   updateButtonsForPublishState();
      })
    try {
      // debugger
      await room.connect(url, token, connectOpts);
      // const elapsed = Date.now() - startTime;
      // console.log(
      //   `successfully connected to ${room.name} in ${Math.round(elapsed)}ms`,
      //   await room.engine.getConnectedServerAddress(),
      // );
    } catch (error: any) {
      let message: any = error;
      if (error.message) {
        message = error.message;
      }
      // console.log('could not connect:', message);
      return;
    }
    currentRoom = room;
    // window.currentRoom = room;
    // setButtonsForState(true);

    // room.participants.forEach((participant) => {
    //   participantConnected(participant);
    // });
    // participantConnected(room.localParticipant);

    return room;
  }

  handleData(msg: Uint8Array, participant?: RemoteParticipant) {
    // const str = state.decoder.decode(msg);
    // const chat = <HTMLTextAreaElement>$('chat');
    // let from = 'server';
    // if (participant) {
    //   from = participant.identity;
    // }
    // chat.value += `${from}: ${str}\n`;
    debugger
    return state.decoder.decode(msg);
  }

  disconnectRoom() {
    if (currentRoom) {
      currentRoom.disconnect();
    }
    // if (state.bitrateInterval) {
    //   clearInterval(state.bitrateInterval);
    // }
  }

  enterText(value: string) {
    if (!currentRoom) return false;
    if (value) {
      const msg = state.encoder.encode(value);
      currentRoom.localParticipant.publishData(msg, DataPacket_Kind.RELIABLE);
      // (<HTMLTextAreaElement>(
      //   $('chat')
      // )).value += `${currentRoom.localParticipant.identity} (me): ${textField.value}\n`;
      // textField.value = '';
      return true
    }
    return false
  }

  async toggleAudio() {
    if (!currentRoom) return;
    const enabled = currentRoom.localParticipant.isMicrophoneEnabled;
    // setButtonDisabled('toggle-audio-button', true);
    if (enabled) {
      console.log('disabling audio');
    } else {
      console.log('enabling audio');
    }
    await currentRoom.localParticipant.setMicrophoneEnabled(!enabled);
    // setButtonDisabled('toggle-audio-button', false);
    // updateButtonsForPublishState();
  }

  async toggleVideo() {
    if (!currentRoom) return;
    // setButtonDisabled('toggle-video-button', true);
    const enabled = currentRoom.localParticipant.isCameraEnabled;
    if (enabled) {
      console.log('disabling video');
    } else {
      console.log('enabling video');
    }
    await currentRoom.localParticipant.setCameraEnabled(!enabled);
    // setButtonDisabled('toggle-video-button', false);
    // renderParticipant(currentRoom.localParticipant);

    // update display
    // updateButtonsForPublishState();
  }

  flipVideo() {
    const videoPub = currentRoom?.localParticipant.getTrack(Track.Source.Camera);
    if (!videoPub) {
      return;
    }
    // if (state.isFrontFacing) {
    //   setButtonState('flip-video-button', 'Front Camera', false);
    // } else {
    //   setButtonState('flip-video-button', 'Back Camera', false);
    // }
    state.isFrontFacing = !state.isFrontFacing;
    const options: VideoCaptureOptions = {
      resolution: VideoPresets.h720.resolution,
      facingMode: state.isFrontFacing ? 'user' : 'environment',
    };
    videoPub.videoTrack?.restartTrack(options);
  }

  async shareScreen() {
    if (!currentRoom) return;

    const enabled = currentRoom.localParticipant.isScreenShareEnabled;
    console.log(`${enabled ? 'stopping' : 'starting'} screen share`);
    // setButtonDisabled('share-screen-button', true);
    await currentRoom.localParticipant.setScreenShareEnabled(!enabled, { audio: true });
    // setButtonDisabled('share-screen-button', false);
    // updateButtonsForPublishState();
  }

  startAudio() {
    currentRoom?.startAudio();
  }

  handleTrackSubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) {
    if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      // parentElement.appendChild(element);
    }
    track.attach();
  }


  handleTrackUnsubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) {
    // remove tracks from all attached elements
    track.detach();
  }

  //  handleLocalTrackUnpublished(track: LocalTrackPublication, participant: LocalParticipant) {
  //   // when local tracks are ended, update UI to remove them from rendering
  //   track.detach();
  // }

  handleActiveSpeakerChange(speakers: Participant[]) {
    // show UI indicators when participant is speaking
  }

  handleDisconnect() {
    console.log('disconnected from room');
  }
}

export default LiveKitHelper;
