var vm = new Vue({
	el: '#app',
	data: {
		chatFilters: [],
		field: '',
	},
	mounted(){
		this.reloadFilters();
	},
	methods: {
		addFilter(){
			this.chatFilters.push(this.field);
			chrome.storage.local.set({'ESTV_chatFilters': this.chatFilters}, () => {});
			this.field = '';
			this.reloadFilters();
		},
		reloadFilters(){
			chrome.storage.local.get('ESTV_chatFilters', (result) => { 
				console.log('result: ', result.ESTV_chatFilters);
				if (result.ESTV_chatFilters.length) {
					console.log('Loaded data from Chrome Local Storage');
					this.chatFilters = result.ESTV_chatFilters;
				} else {
					this.chatFilters = [];
				}
			});		
		},
		removeFilter(index){
			this.chatFilters.splice(index, 1);
			chrome.storage.local.set({'ESTV_chatFilters': this.chatFilters}, () => {});
		}
	},
	watch:{
		chatFilters(){
			console.log(this.chatFilters);
		}
	}

})
