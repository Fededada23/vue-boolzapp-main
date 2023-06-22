const { createApp } = Vue
const { createPicker } = picmo;

createApp({
    data() {
        return {
            // array di contatti
            contacts: [
                {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                        {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                        }
                    ],
                },
                {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                        {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                        },
                        {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                        },
                        {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                        }
                    ],
                },
                {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                        {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                        },
                        {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                        },
                        {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                        }
                    ],
                },
                {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                        {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                        }
                    ],
                },
                {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                        {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                        }
                    ],
                },
                {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                        {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                        },
                        {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                        }
                    ],
                },
                {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                        {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                        }
                    ],
                },
                {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                        {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                        },
                        {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                        },
                        {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                        },
                    ],
                },
            ],

            // barra di ricerca
            search: '',

            // scrivo messaggio
            messageEnter: '',
   
            // setto il profilo attivo
            profileActive: 0,

            // sto scrivendo ?
            is_writing: null,

            // messaggi di risposta casuali
            casualAnswers: ['Sono un Jedi, se credi nella giustizia aiutami a sconfiggere Dark Wader.', 'Ciao, chi vuole giocare ad AmongUs?', 'Sotto la panca la capra crepa, sopra la panca la capra canta', 'Ma sei pazzo?!', 'Whaoo!!!, e come è stato?', 'Ho capito', 'Hai mai giocato ai souls? Se non ti piaciono non puoi essere un videogiocatore', 'Lies of P. A lawsuit waiting to happen', 'Silksong where are you? ;('],
        }
    },
    methods: {
        // funzione di ricerca profili
        filterdContacts() {
            let searchProfile = this.search.toLowerCase()
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].name.toLowerCase().includes(searchProfile)) {
                    this.contacts[i].visible = true;
                }
                else if (!(this.contacts[i].name.toLowerCase().includes(searchProfile))) {
                    this.contacts[i].visible = false;
                }
            }
        },

        // definisco profileActive
        chosenProfile(index) {
            this.profileActive = index;
            this.hideShowDownChat()
        },

        // definisco l'ora corrente di default come da array
        DefaultDateTime() {
            const presentDay = new Date;
            const presentDayOK = presentDay.getDate() + '/' + (presentDay.getMonth() + 1) + '/' + presentDay.getFullYear() + ' ' + ((presentDay[Symbol.toPrimitive]("string")).split(" ")[4]);
            return presentDayOK
        },

        // funzione per scrivere il messaggio e risposta
        enterMessage() {
            if (this.messageEnter != '' && this.messageEnter.replace(/\s/g, '').length != 0) {
                let newMessage = {
                                     date: this.DefaultDateTime(),
                                     message: this.messageEnter,
                                     status: 'sent'
                                 };
                if (this.contacts[this.profileActive].messages[0].status === 'default') {
                    this.contacts[this.profileActive].messages.splice(0, 1, newMessage);
                }
                else {
                    this.contacts[this.profileActive].messages.push(newMessage);
                }

                // scrolla all'ultimo messaggio sempre
                this.$nextTick(() => {
                    this.scrollToEnd()
                })
                
                // svuoto l'input dei messaggi
                this.messageEnter = '';

                // imposto il diverso this.lastAccess()
                this.is_writing = 'scrive';

                // definisco la risposta casuale dopo un secondo
                setTimeout(() => {
                    let casualindex = Math.floor(Math.random() * (this.casualAnswers.length));
                    let newAnswer = {
                                        date: this.DefaultDateTime(),
                                        message: this.casualAnswers[casualindex],
                                        status: 'received'
                                    }
                    this.contacts[this.profileActive].messages.push(newAnswer);

                    // scrolla all'ultimo messaggio sempre
                    this.$nextTick(() => {
                        this.scrollToEnd()
                    })

                    // reimposto il diverso this.lastAccess()
                    this.is_writing = 'online';
                }, 1000);

                // riporto lo stato all'ultimo accesso di this.lastAccess(), dopo due secondi dalla risposta
                setTimeout(() => {
                    this.is_writing = null;
                }, 3000)
                function onSelectEmoji(emoji) {
                    console.log(emoji)
                }
            }
        },

        // abbrevio ultimo messaggio inviato/ricevuto
        shortMessage(index) {
            let lastMessage = this.contacts[index].messages[this.contacts[index].messages.length - 1].message;
            if (lastMessage.length > 25) {
                lastMessage = lastMessage.substring(0, 26) + '...';
            }
            return lastMessage
        },

        // abbrevio il tempo in ore e minuti
        shortTime(date) {
            const dayTime = date.split(' ')[1];
            const [hours, minutes, seconds] = dayTime.split(':');
            const dayTimeOK = hours + ':' + minutes;
            return dayTimeOK
        },

        // BONUS
        // mostro la drop-down_chat dei messaggi
        showDropdownChat(index) {
            if(this.contacts[this.profileActive].messages[0].status != 'default') {
                let idActive = `active-${index}`;
                let activeDropdown = document.getElementById(idActive);
                activeDropdown.classList.toggle('show_drop-down');
            }
        },

        // nascondo la drop-down_chat dei messaggi
        hideShowDownChat() {
            let allDropdownsChat = document.getElementsByClassName('drop-down_chat');
            for (let i = 0; i < allDropdownsChat.length; i++) {
                allDropdownsChat[i].classList.remove('show_drop-down')
            }
        },

        // mostro/nascondo la dropdown dei dots in alto a destra
        showDropdownDots() {
            let dropdownDots = document.querySelector('.drop-down_dots-chat')
            dropdownDots.classList.toggle('show_drop-down')
        },

        // mostro/nascondo gli emoji
        emojiDropdown() {
            let emojiDrop = document.querySelector('.pickerContainer')
            emojiDrop.classList.toggle('show_drop-down')
        },

        // cancellare il tutto il contatto
        eraseContact() {
            this.contacts.splice(this.profileActive, 1)
        },

        // cancellare tutti i messagi della chat corrente
        eraseAllMessages() {
            let ReplaceMessage = {
                date: this.DefaultDateTime(),
                message: "Hai eliminato tutti i messaggi di questo contatto",
                status: 'default'
            };
            this.contacts[this.profileActive].messages = []
            this.contacts[this.profileActive].messages.push(ReplaceMessage)
        },
        
        // cancellare il messaggio
        eraseMessage(index) {
            let ReplaceMessage = {
                                     date: this.DefaultDateTime(),
                                     message: "Hai eliminato tutti i messaggi di questo contatto",
                                     status: 'default'
                                 };
            if (this.contacts[this.profileActive].messages.length == 1) {
                this.contacts[this.profileActive].messages.splice(index, 1, ReplaceMessage)
            }
            else {
                this.contacts[this.profileActive].messages.splice(index, 1)
            }
            this.hideShowDownChat()
        },

        // visualizzo l'ultimo accesso
        lastAccess() {
            let accessTime = this.shortTime(this.contacts[this.profileActive].messages[this.contacts[this.profileActive].messages.length - 1].date);
            let accessTimeOK = 'Ultimo accesso alle' + ' ' + accessTime;
            
            if (this.is_writing === 'scrive') {
                return 'sto scrivendo...';
            }
            else if (this.is_writing === 'online') {
                return 'Online'
            }
            return accessTimeOK
        },

        // scrollo all'ultimo messaggio sempre
        scrollToEnd() {  
            let container = document.querySelector(".chat-scroll");
            container.scrollTop = container.scrollHeight
        },
    },
    mounted() {
        const container = document.querySelector('.pickerContainer');

        const picker = createPicker({
            rootElement: container,
        });

        picker.addEventListener('emoji:select', event => {
            console.log('Emoji selected:', event.emoji);
            this.messageEnter += event.emoji
        })
    },
}).mount('#app')
