// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(num, arr) {
    return {
    specimenNum: num,
    dna: arr,
    mutate() {
        const randIndex = Math.floor(Math.random() * this.dna.length);
        let newBase = returnRandBase();
        //copied from solution
        while (this.dna[randIndex] === newBase) {
          newBase = returnRandBase();
        }
        this.dna[randIndex] = newBase;
        return this.dna;
      },
    compareDNA(pAequor) {
      //copied from solution:
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if(arr[idx] === pAequor.dna[idx]) {
          return acc +1;
        } else {
          return acc;
        }
      }, 0)
      let percentageMatch = (similarities / this.dna.length) * 100;
      console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentageMatch}% DNA in common.`);
    /* my first attempt:
     let counter = 0;
      for(i = 0, i < this.dna.length; i++;) {
        if(this.dna[i] === pAequor.dna[i]) {
          return counter++;
        } 
        }
      let percentageMatch = (counter / this.dna.length) * 100;
      console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentageMatch}% DNA in common.`);
    } */
    },
    willLikelySurvive() {
      //2nd attempt after more research:
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G');
      const cgPercent = (cgCount.length / this.dna.length) * 100;
      if(cgPercent >= 60) {
        return true;
      } else {
        return false;
      }
     
      /* 1st attempt:
      let cgCount = 0;
      console.log(cgCount);
      let cgPercent = (cgCount / this.dna.length) * 100;
      for(i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') {
         cgCount++;
        }
      }
      if(cgPercent >= 60) {
        return true;
      } else {
        return false;
      }
    } */
    }
  }
}
//referenced from solution
const survivingOrganisms = [];
let idCounter = 1;

while(survivingOrganisms.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if(newOrg.willLikelySurvive()) {
    survivingOrganisms.push(newOrg);
  }
  idCounter++;
}



/* 1st attempt:
const createArray = (randomPAequor) => {
  let arr = [];
  while(arr.length < 30) {
if(randomPAequor.willLikelySurvive === true) {
  arr.push(randomPAequor.dna);
};
return arr;
}
} */

const randomPAequor = pAequorFactory(Math.floor(Math.random() * 30), mockUpStrand());

const test1 = pAequorFactory(2, mockUpStrand());

console.log(test1);
console.log(test1.mutate());

const test2 = pAequorFactory(123, mockUpStrand());
const test3 = pAequorFactory(125, mockUpStrand());

console.log(test2);
console.log(test3);

console.log(test2.compareDNA(test3));

console.log(test3.willLikelySurvive());

console.log(survivingOrganisms);