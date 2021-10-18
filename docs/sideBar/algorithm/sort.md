:::tip
十大经典排序算法（动图演示）
:::

### 0、算法概述
#### 0.1 算法分类
十种常见排序算法可以分为两大类：

比较类排序：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序。
非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。
![avatar](/images/sort/sort.png)
#### 0.2 算法复杂度
![avatar](/images/sort/kong.png)
#### 0.3 相关概念

稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。
时间复杂度：对排序数据的总的操作次数。反映当n变化时，操作次数呈现什么规律。
空间复杂度：是指算法在计算机
内执行时所需存储空间的度量，它也是数据规模n的函数。 

#### 1、冒泡排序（Bubble Sort）
冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。 

#### 1.1 算法描述
比较相邻的元素。如果第一个比第二个大，就交换它们两个；
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
针对所有的元素重复以上的步骤，除了最后一个；
重复步骤1~3，直到排序完成。
#### 1.2 动图演示
![avatar](/images/sort/bubbleSort.gif)
#### 1.3 代码实现
```js
function bubbleSort(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++) {
        for(var j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {       // 相邻元素两两对比
                var temp = arr[j+1];       // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```
#### 2、快速排序（Quick Sort）
快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

#### 2.1 算法描述
快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：

从数列中挑出一个元素，称为 “基准”（pivot）；
重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
#### 2.2 动图演示
![avatar](/images/sort/quickSort.gif)
#### 2.3 代码实现
```js
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left =typeof left !='number'? 0 : left,
        right =typeof right !='number'? len - 1 : right;
 
    if(left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}
 
function partition(arr, left ,right) {    // 分区操作
    var pivot = left,                     // 设定基准值（pivot）
        index = pivot + 1;
    for(var i = index; i <= right; i++) {
        if(arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }       
    }
    swap(arr, pivot, index - 1);
    return index-1;
}
 
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
quickSort([3,5,8,1,2])
```