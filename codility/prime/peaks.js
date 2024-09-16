// A non-empty array A consisting of N integers is given.

// A peak is an array element which is larger than its neighbors. More precisely, it is an index P such that 0 < P < N − 1,  A[P − 1] < A[P] and A[P] > A[P + 1].

// For example, the following array A:

//     A[0] = 1
//     A[1] = 2
//     A[2] = 3
//     A[3] = 4
//     A[4] = 3
//     A[5] = 4
//     A[6] = 1
//     A[7] = 2
//     A[8] = 3
//     A[9] = 4
//     A[10] = 6
//     A[11] = 2
// has exactly three peaks: 3, 5, 10.

// We want to divide this array into blocks containing the same number of elements. More precisely, we want to choose a number K that will yield the following blocks:

// A[0], A[1], ..., A[K − 1],
// A[K], A[K + 1], ..., A[2K − 1],
// ...
// A[N − K], A[N − K + 1], ..., A[N − 1].
// What's more, every block should contain at least one peak. Notice that extreme elements of the blocks (for example A[K − 1] or A[K]) can also be peaks, but only if they have both neighbors (including one in an adjacent blocks).

// The goal is to find the maximum number of blocks into which the array A can be divided.

// Array A can be divided into blocks as follows:

// one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
// two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
// three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak. Notice in particular that the first block (1, 2, 3, 4) has a peak at A[3], because A[2] < A[3] > A[4], even though A[4] is in the adjacent block.
// However, array A cannot be divided into four blocks, (1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak. Notice in particular that the (4, 3, 4) block contains two peaks: A[3] and A[5].

// The maximum number of blocks that array A can be divided into is three.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the maximum number of blocks into which A can be divided.

// If A cannot be divided into some number of blocks, the function should return 0.

// For example, given:

//     A[0] = 1
//     A[1] = 2
//     A[2] = 3
//     A[3] = 4
//     A[4] = 3
//     A[5] = 4
//     A[6] = 1
//     A[7] = 2
//     A[8] = 3
//     A[9] = 4
//     A[10] = 6
//     A[11] = 2
// the function should return 3, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [0..1,000,000,000].

// Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Peaks.md ... Score: 90% ... O(n * log (log n)) ... but fails large_anti_slow test

function solution2(A) {
    let n = A.length;
    let peaks = [];
    
    for (let i = 1; i < n - 1; i++) {
        if (A[i - 1] < A[i] && A[i] > A[i + 1]) {
            peaks.push(i);
        }
    }

    let max = 0;
    
    for (let i = 1; i < n; i++) {
        if ((n % i) == 0) {
            let bi = 0;
            let block = n / i;
            for( let ind in peaks ) {
                if (bi * block <= peaks[ind] && peaks[ind] < (bi + 1) * block) {
                    bi++;
                }
            }
            if (bi == i) {
                max = i;
            }
        }
    }

    return max;
}

// Credit: Jonatas Walker https://app.codility.com/demo/results/training7GBTZ2-BNT/ ... 100% ... O(n * log (log n))

function solution(A) {    
    if ( A.length < 3 ) {
        return 0;
    }
    
    let peaks = [];
    let maxSize = 0;
    
    for ( let i = 1; i < A.length - 1; i++ ) {
        if ( A[i] > A[i-1] && A[i] > A[i+1] ) {
            peaks.push(i);
        }
    }
    
    if ( peaks.length < 2 ) {
        return peaks.length;
    }
    
    for( let i = 1; i <= A.length; i++ ) {
        if ( A.length % i === 0 ) {
            let blockSize = i;
            let blockCount = A.length / i;
            
            let lastGroup = 0;
            for( let j = 0; j < peaks.length; j++ ) {
                if ( parseInt( peaks[j] / blockSize ) === lastGroup ) {
                    lastGroup++;
                }
            }
            
            if ( lastGroup === blockCount ) {
                maxSize = Math.max(maxSize, blockCount);
            }
        }
    }
    
    return maxSize;
}

console.log( solution( [1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2] ) );