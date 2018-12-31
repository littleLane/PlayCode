/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var carry = 0;
var addTwoNumbers = function(l1, l2) {
    var result = addNodeVal();
    var r = result;
    while(l1 || l2) {
        var l1Next = l1 && l1.next;
        var l2Next = l2 && l2.next;
        r.next = addNodeVal(l1, l2);
        r = r.next;
        l1 = l1Next;
        l2 = l2Next;
    }
    
    return result.next;
};

function addNodeVal(node1, node2) {
    var nodeVal1 = node1 && node1.val ? node1.val : 0;
    var nodeVal2 = node2 && node2.val ? node2.val : 0;
    var count = nodeVal1 + nodeVal2 + carry;
    
    if(count >= 10) {
        carry = 1;
        return new ListNode(count % 10);
    }
    carry = 0;
    return new ListNode(count);
}