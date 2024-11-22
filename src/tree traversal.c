#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

struct Node* newNode(int data) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

struct Node* insertNode(struct Node* node, int data) {
    if (node == NULL) return newNode(data);

    char choice;
    printf("Where do you want to insert %d? Enter 'L' for left and 'R' for right of %d: ", data, node->data);
    scanf(" %c", &choice);

    if (choice == 'L' || choice == 'l') {
        node->left = insertNode(node->left, data);
    } else if (choice == 'R' || choice == 'r') {
        node->right = insertNode(node->right, data);
    } else {
        printf("Invalid input. Node not inserted.\n");
    }

    return node;
}

void preorder(struct Node* node) {
    if (node == NULL) return;
    printf("%d ", node->data);
    preorder(node->left);
    preorder(node->right);
}

void inorder(struct Node* node) {
    if (node == NULL) return;
    inorder(node->left);
    printf("%d ", node->data);
    inorder(node->right);
}

void postorder(struct Node* node) {
    if (node == NULL) return;
    postorder(node->left);
    postorder(node->right);
    printf("%d ", node->data);
}

int main() {
    struct Node* root = NULL;
    int n, data;

    printf("Enter the number of nodes: ");
    scanf("%d", &n);

    if (n > 0) {
        printf("Enter data for the root node: ");
        scanf("%d", &data);
        root = newNode(data);

        for (int i = 1; i < n; i++) {
            printf("Enter data for node %d: ", i + 1);
            scanf("%d", &data);
            root = insertNode(root, data);
        }

        printf("\nPreorder Traversal: ");
        preorder(root);
        printf("\n");

        printf("Inorder Traversal: ");
        inorder(root);
        printf("\n");

        printf("Postorder Traversal: ");
        postorder(root);
        printf("\n");
    } else {
        printf("The tree must have at least one node.\n");
    }

    return 0;
}
