let StringDiffHelper = function() {
    let getAllIndexes = (arr, val) => {
        let indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) !== -1){
            indexes.push(i);
        }
        return indexes;
    };

    let getDiff = (arr1, arr2) => {
        let matrix = {};
        let maxlen = 0,
            omax = 0,
            nmax = 0;

        arr1.forEach((ovalue, oindex) => {
            let nkeys = getAllIndexes(arr2, ovalue);
            nkeys.forEach((nindex) => {
                if(typeof matrix[oindex] === 'undefined') {
                    matrix[oindex] = {};
                }

                if (typeof matrix[oindex - 1] !== 'undefined' && typeof matrix[oindex - 1][nindex - 1] !== 'undefined') {
                    matrix[oindex][nindex] = matrix[oindex - 1][nindex - 1] + 1;
                } else {
                    matrix[oindex][nindex] = 1;
                }

                if(matrix[oindex][nindex] > maxlen){
                    maxlen = matrix[oindex][nindex];
                    omax = oindex + 1 - maxlen;
                    nmax = nindex + 1 - maxlen;
                }
            });
        });

        if(maxlen === 0) {
            return [{'d': arr1, 'i': arr2}];
        }

        return getDiff(arr1.slice(0, omax), arr2.slice(0, nmax)).concat(arr2.slice(nmax, (nmax + maxlen)), getDiff(arr1.slice(omax + maxlen), arr2.slice(nmax + maxlen)));
    };

    let textOutputBuilder = (str1, str2) => {
        let arr1 = str1.split("");
        let arr2 = str2.split("");
        let diff = getDiff(arr1, arr2);

        let result1 = '';
        let result2 = '';

        diff.forEach((each) => {
            if(typeof each === 'object') {
                let insertedCount = each.i.length;
                let arrayCount = insertedCount;
                let deletedCount = each.d.length;
                if(deletedCount > insertedCount) {
                    arrayCount = deletedCount;
                }
                if(deletedCount > 0 && each.d[0] !== '') {
                    result1 += "<mark>";
                }
                if(insertedCount > 0 && each.i[0] !== '') {
                    result2 += "<mark>";
                }
                for(let i = 0; i < arrayCount; i++) {
                    result1 += typeof each.d[i] !== 'undefined' ? each.d[i]: '';
                    result2 += typeof each.i[i] !== 'undefined' ? each.i[i]: '';

                }
                if(deletedCount > 0 && each.d[0] !== '') {
                    result1 += "</mark>";
                }
                if(insertedCount > 0 && each.i[0] !== '') {
                    result2 += "</mark>";
                }
            } else {
                result1 += each;
                result2 += each;
            }
        });

        return [
            result1,
            result2
        ];
    };

    /**
     * let remarks = ['=', '+', '<>', '-']
     *
     * where:
     *   '='  means no changes between the lines
     *   '+'  means this line is newly added
     *   '<>' means this line was modified
     *   '-'  means this line was removed
     *
     * @param str1
     * @param str2
     * @returns {Array}
     */
    let lineOutputBuilder = (str1, str2) => {
        let arr1 = str1.split("\n");
        let arr2 = str2.split("\n");
        let diff = getDiff(arr1, arr2);

        let result = [];
        diff.forEach((each) => {
            let remark = '=';

            if(typeof each === 'object') {
                let insertedCount = each.i.length;
                let arrayCount = insertedCount;
                let extra = 'inserted';
                let deletedCount = each.d.length;

                if(deletedCount > insertedCount) {
                    arrayCount = deletedCount;
                    extra = 'deleted';
                }
                for(let i = 0; i < arrayCount; i++) {
                    remark = '<>';
                    let diff1 = typeof each.d[i] !== 'undefined' ? each.d[i] : '';
                    let diff2 = typeof each.i[i] !== 'undefined' ? each.i[i] : '';

                    if(extra === 'inserted' && diff2 === '') {
                        each.d.splice(i, 0, "");
                        diff1 = '';
                        remark = '+';
                    }

                    if(each.d.length === 0) {
                        remark = '+';
                    }

                    if(extra === 'deleted' && diff1 === '') {
                        each.i.splice(i, 0, "");
                        diff2 = '';
                        remark = '-';
                    }

                    if(each.i.length === 0) {
                        remark = '-';
                    }


                    let textResult = textOutputBuilder(diff1, diff2);

                    result.push({
                        remark: remark,
                        diff1: textResult[0],
                        diff2: textResult[1]
                    });
                }
            } else {
                result.push({
                    remark: remark,
                    diff1: each,
                    diff2: each
                })
            }
        });

        return result;
    };

    return {
        lineOutputBuilder
    }
}();