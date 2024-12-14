# Assignment-CO2011-CSE241-2312046_2313233_2310687_2313348_2310936

Mathematical modeling - TN01 
Group 104
Instructors: Nguyễn An Khương

Group members: 


Bùi Ngọc Minh - 2312046 (Leader)


Lê Trọng Thiện - 2313233


Phạm Lê Tiến Đạt - 2310687


Lương Minh Thuận - 2313348


Nguyễn Đăng Hiên - 2310936



## Sumary

This big excercise concerns the 2D Cutting stock problem, which aims to find a cutting patterns given a set of stocks and a set of items that reduces the total cost or the amount of stock sheets required. 
For this big excercise, our group have implemented two main algorithms for solving the 2D Cutting stock problem:
+ Combination heuristic (combining Best-fit and First-fit):
  Our group leverages the strength of both algorthms and implemented this solution with the aim to compute a heuristic solution better than Best-fit. The results shows a considerable improvement over First-fit.
+ Reinforcement learning approach:
  Our RL agent was trained using PPO and tasked with picking the position to cut a given item into a given stock. While what item and stock to cut is delegated to a heuristic similar to the one above.
  In practice, our RL agent produces fairly good results compared to First-fit.


In addition, our group also developed Best-fit and First-fit (Greedy) by themselves for comparison, and developped a further optimization algorithm on the results using simplex.
The code for these can be found in the folder "additional_policies" and "simplex_application".

---
## Testing (Bench marking) results
---
The following tables presented the results after bench marking 3 different algorithms using 5
batches of randomized environments. Each batch contains 10 different seeds for environment
generation, totaling 50 different environment set ups. The cvs data for this bench mark can be found in the folder "bench_mark".

---
## Greedy Policy (for comparison)
| **\rowcolor{gray!30} 	extbf{No.}** | **\textbf{Best waste rate}** | **\textbf{Average waste rate}** | **\textbf{Best fitness}** | **\textbf{Average fitness}** | **\textbf{Best time}** | **\textbf{Average time}** |
|------------------------------------|------------------------------|---------------------------------|---------------------------|------------------------------|------------------------|---------------------------|
| \textbf{1}                         | 0.1714                       | 0.3373                          | 0.8537                    | 0.7602                       | 0.9387                 | 19.1134                   |
| \textbf{2}                         | 0.1477                       | 0.2924                          | 0.8713                    | 0.7814                       | 1.0790                 | 46.1255                   |
| \textbf{3}                         | 0.1175                       | 0.8661                          | 0.8949                    | 0.6820                       | 0.0040                 | 77.9725                   |
| \textbf{4}                         | 0.1188                       | 0.3385                          | 0.8938                    | 0.7587                       | 0.1318                 | 18.9791                   |
| \textbf{5}                         | 0.1808                       | 0.2673                          | 0.8469                    | 0.7912                       | 0.2565                 | 17.9854                   |
---
## Combination heuristic
| **\rowcolor{gray!30} 	extbf{No.}** | **\textbf{Best waste rate}** | **\textbf{Average waste rate}** | **\textbf{Best fitness}** | **\textbf{Average fitness}** | **\textbf{Best time}** | **\textbf{Average time}** |
|------------------------------------|------------------------------|---------------------------------|---------------------------|------------------------------|------------------------|---------------------------|
| \textbf{1}                         | 0.0561                       | 0.1466                          | 0.9469                    | 0.8782                       | 1.6775                 | 9.4369                    |
| \textbf{2}                         | 0.0478                       | 0.0948                          | 0.9544                    | 0.9154                       | 1.3211                 | 13.8800                   |
| \textbf{3}                         | 0.0348                       | 0.2466                          | 0.9664                    | 0.8581                       | 0.1556                 | 12.4730                   |
| \textbf{4}                         | 0.0409                       | 0.1138                          | 0.9607                    | 0.9002                       | 0.3321                 | 7.4599                    |
| \textbf{5}                         | 0.0538                       | 0.1092                          | 0.9490                    | 0.9030                       | 0.5570                 | 8.2988                    |
---
## Table: Reinforcement Learning (RL)
| \rowcolor{gray!30} 	extbf{No.} | \textbf{Best waste rate} | \textbf{Average waste rate} | \textbf{Best fitness} | \textbf{Average fitness} | \textbf{Best time} | \textbf{Average time} |
|--------------------------------|--------------------------|-----------------------------|-----------------------|--------------------------|--------------------|-----------------------|
| \textbf{1}                     | 0.0804                   | 0.2132                      | 0.9256                | 0.8365                   | 2.9585             | 37.5355               |
| \textbf{2}                     | 0.0565                   | 0.1955                      | 0.9465                | 0.8517                   | 1.4830             | 47.7499               |
| \textbf{3}                     | 0.0396                   | 0.7459                      | 0.9619                | 0.7620                   | 0.1854             | 54.3464               |
| \textbf{4}                     | 0.0829                   | 0.1590                      | 0.9235                | 0.8681                   | 0.6262             | 39.5981               |
| \textbf{5}                     | 0.0730                   | 0.1647                      | 0.9320                | 0.8629                   | 0.6247             | 39.4916               |
---



