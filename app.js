Vue.use(VueMaterial.default);

var app = new Vue({
    el: "#app",
    data() {
        return {
            type: "",
            page: "query",
            isQueryPage: true,
            lotCounter: 1,
            lots: [{ base1: '', comp: '', base2: '' }],
            groupby: '',
            status: '',
            showLoader: true,
            hasInputError: false,
        };
    },
    watch: {
        lots: {
            deep: true, // added this so that the nested element will be watched as well
            handler(lot) {
                if (this.lots[this.lotCounter - 1].base1 !== '' || this.lots[this.lotCounter - 1].comp !== '' || this.lots[this.lotCounter - 1].base2 !== '') {
                    this.lots.push({ base1: '', comp: '', base2: '' });
                    this.lotCounter++;
                }
            }
        }
    },
    methods: {
        change_page: function (page) {
            this.page = page;
            if (this.page === 'query') {
                this.isQueryPage = true;
            }
            else {
                this.isQueryPage = false;
            }
        },
        validate_input: function () {

            if (this.lots.length === 1) {
                this.status = `Error: Please insert lot numbers!`
                this.hasInputError = true;
                this.showLoader = false;
                return;
            }

            this.lots.pop(); // last elememt is always empty

            for (let index = 0; index < this.lots.length; index++) {
                if (this.lots[index].base1 === '') {
                    this.status = `Error in lot set #${index + 1}: Base1 lot cannot be empty!`
                    this.hasInputError = true;
                    this.showLoader = false;
                    return;

                } else if (this.lots[index].comp === '') {
                    this.status = `Error in lot set #${index + 1}: Comp lot cannot be empty!`
                    this.hasInputError = true;
                    this.showLoader = false;
                    return;
                }

                if (!this.lots[index].base1.includes('/') || !this.lots[index].comp.includes('/')) {
                    this.status = `Error in lot set #${index + 1}: lot must be in slash format!`
                    this.hasInputError = true;
                    this.showLoader = false;
                    return;
                }
                if (this.lots[index].base1 !== '' && !this.lots[index].base1.includes('/')) {
                    this.status = `Error in lot set #${index + 1}: lot must be in slash format!`
                    this.hasInputError = true;
                    this.showLoader = false;
                    return;

                }
            }
        },
        clearError: function () {
            this.hasInputError = false;
            this.showLoader = true;
        },
        submit: function () {
            this.status = 'Validating Input...';
            this.validate_input();

            this.status = 'Pulling Data...';



            this.lots = [{ base1: '', comp: '', base2: '' }];
            this.lotCounter = 1;

        }
    },
});
