class AsyncWorker {
    constructor() {
        this.queue = [];
        this.maxCount = 2;
        this.currentCount = 0;
    }

    addTask(asyncJob) {
        this.queue.push(asyncJob);
    }

    taskStart() {
        for(let i = 0; i < this.maxCount; i++) {
            this.doTask();
        }
    }

    doTask() {
        if(!this.queue || !this.queue.length || this.currentCount >= this.maxCount) {
            return;
        }
        this.currentCount++;
        this.queue.shift()().then(()=>{
            this.currentCount--;
            this.doTask();
        })
    }
    
}

const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const worker = new AsyncWorker();

const addTask = (time, order) => {
    worker.addTask(()=>timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1');
addTask(500,'2');
addTask(300,'3');
addTask(400,'4');

worker.taskStart();