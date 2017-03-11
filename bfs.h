#include <iostream>
#include "bag.cpp"
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <sys/time.h>
#include <time.h>

typedef struct graphstruct {
	int nv;
	int ne;
	int *nbr;
	int *firstnbr;
} graph;

//static const char *optString = "hgrs:e:n:";

void bfs (int s, graph *G, int **levelp, int *nlevelsp, int **levelsizep, int **parentp);
int read_edge_list (int **tailp, int **headp);
graph * graph_from_edge_list (int *tail, int *head, int nedges);
void print_CSR_graph (graph *G);
bool hasNeighbors (int startv, graph *G);