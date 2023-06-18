import {createSignal, createEffect, Show} from "solid-js";
import "./CreateVideoPopup.css";
import UploadIcon from "~/images/upload.png";

interface Status{
    status:boolean
}

export default function CreateVideoPopup(props: Status) {

    const [value, setValue] = createSignal<boolean>(true);

    createEffect(() => {
        setValue(props.status)
    });

    // const [loggedIn, setLoggedIn] = createSignal(true);
    // const showLogin = () => {
    //     setLoggedIn(true);
    //     setSignUp(false);
    // }
    // const [signUp, setSignUp] = createSignal(false);
    // const showSignUp = () => {
    //     setLoggedIn(false);
    //     setSignUp(true);
    // }

    const inputDescription = () => {
        var videoDesc = document.getElementById("video-description");
        var videoDescLength = videoDesc.value.length;
        if (videoDescLength > 200) {
            videoDesc.value = videoDesc.value.substring(0, 200);
            videoDescLength = 200;
        }
        document.getElementById("character-count").innerHTML = videoDescLength;
    }

    return (
        <>
            <div class="create-video-block">
                <div class="block"  id={value()?"block-active" : ""} >
                    <div class="create-video-container">
                        <form action="" class="post-form"  id="login">
                            <div class="video-title">
                                <input
                                    class='input-value'
                                    type="text"
                                    placeholder="Video Title"
                                    name="username"
                                ></input>
                            </div>
                            <div>
                                <textarea class="video-intro" id="video-description" rows={4} placeholder="Please write a short description of your video..."
                                          oninput={inputDescription}/>
                                <p class="word-count"><span id="character-count">0</span>/200</p>
                            </div>
                            <div class="upload-video-area">
                                <img class="upload-icon" src={UploadIcon} />
                                <p>Please upload Introduction video</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
