
console.log("Enhanced SteamTV Loaded");

let chatChecker = setInterval(registerChatFiltersEvent, 1000);
let chatFilters = [];

chrome.storage.local.get('ESTV_chatFilters', (result) => { 
	chatFilters = result.ESTV_chatFilters;
});

let ESTVchat = null;
let chatFrame = null;

function registerChatFiltersEvent(){
	if (document.querySelector(".BroadcastChat iframe") != null) {
		console.log('Chat Window Event Registered');
		chatFrame = document.querySelector(".BroadcastChat iframe")
		ESTVchat = chatFrame.contentWindow.document.body.querySelector("#ChatMessages")
		ESTVchat.addEventListener("DOMSubtreeModified", hideFilters);
		clearInterval(chatChecker);
	}
}

function hideFilters(event){
	let messages = ESTVchat.querySelectorAll(".ChatMessage");
	messages.forEach((message) => {
		let chatMessage = message.querySelector('.tmplChatMessage');
		chatFilters.forEach((filter)=>{
			if (chatMessage.innerText.indexOf(filter) !== -1)  {
				message.remove();
			}	
		});
	});
}

