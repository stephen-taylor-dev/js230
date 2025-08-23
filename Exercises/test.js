document.addEventListener('DOMContentLoaded', () => {
            let eventList = [];

            const tracker = {
                addEventToList: function(event) {
                    if (!eventList.includes(event)) {
                        eventList.push(event);
                    }
                },

                list: function() {
                  return [eventList];
                },
                
                elements: function() {
                  return eventList.map(({target}) => target);
                },

                clear: function() {
                    eventList.length = 0;
                    return eventList.length;
                },


            };
            
            function track(callback) {
                return (event) => {
                    tracker.addEventToList(event);
                    tracker.elements().push(event.target);
                    callback(event);
                }
            }
            
            const divRed = document.querySelector('#red');
            const divBlue = document.querySelector('#blue');
            const divOrange = document.querySelector('#orange');
            const divGreen = document.querySelector('#green');

            divRed.addEventListener('click', track(event => {
                document.body.style.background = 'red';
            }));

            divBlue.addEventListener('click', track(event => {
                event.stopPropagation();
                document.body.style.background = 'blue';
            }));

            divOrange.addEventListener('click', track(event => {
                document.body.style.background = 'orange';
            }));

            divGreen.addEventListener('click', track(event => {
                document.body.style.background = 'green';
            }));


            divBlue.click();
            divRed.click();
            divOrange.click();
            divGreen.click();

            console.log(tracker.list().length);
            console.log(tracker.elements());
             console.log(tracker.elements()[0]);
            console.log(tracker.elements()[0] === document.querySelector('#blue'));
            console.log(tracker.elements()[3] === document.querySelector('#green'));
            console.log(tracker.list()[0]);
            console.log( tracker.clear());
            console.log(tracker.list());
            tracker.list()[0] = 'abc';
            console.log(tracker.list().length);            

        });