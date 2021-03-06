---
id: user_alignments
title: Alignments tracks
---

Visualizing alignments is an important aspect of genome browsers. This guide
will go over the main features of the "Alignments track"

The alignments track is a combination of a pileup and a coverage visualization

### Pileup visualization

The pileup is the lower part of the alignments track and shows each of the
reads as boxes positioned on the genome.

By default the reads are colored red if they aligned to the forward strand of
the reference genome, or blue if they aligned to the reverse strand.

### Coverage visualization

The coverage visualization shows the depth-of-coverage of the reads at each
position on the genome, and also draws using colored boxes any occurence of
mismatches between the read and the reference genome, so if 50% of the reads
had a T instead of the reference A, half the height of the coverage histogram
would contain a 'red' box

<!--
image info:
window.innerWidth
1378
window.innerHeight
513
https://s3.amazonaws.com/jbrowse.org/code/jb2/alpha/master/index.html?config=test_data%2Fconfig_demo.json&session=eJztVctu2kAU_RU0q1Yixjbh5V0e5NFSioA2UqsKje2LPYk9tmYGSIL8770zJsYkRF1U6qoLFtzXOXN8Zu6WcJoC8cgYNo0ZSMky3nBt1z6xeyd2d-7aXsf17IFlO70fpElSKiLGiWc3SSjoBsQdC1VMvHb_tEnWDDaSeD-3hIU48u75Sn1yJ_c-9oVM5gl9GpdgceQMMKiecv1vxDhQcQ08S-E7jsBMtlxKUJNH4jnt027X6nR7_U7HcQY9u9Mkfj4BYZLVYAinECH3El7Acofk4DCpqFCGMnDk5Z4O3I7ddbFZwBqEBAwuaSKhSaiUkPrJAc_iFzIVNHioHe2b0x9GjjMc7U9xlrCIp8CVnOtiTMTAohiB3QFqE2R8yaKVoApZYjmP0kRg0YQlsMrLFq8SbhEl12rUH-7H1-v2ox3bfjN6e7zFHOE2fIFe5CaLiZ0BZp_Pp-1GTgOfZY0P4-svo-nHRlVUF0brUEqDygRUQZSJJx0zI3SQhjRXIGpczml6tgvi96PpKAsquivBtNZK5dJrtWTboil9zjjdSCvI0ta9L7KNBCsTUSsyJpEtjd4SQEO5wKPIB1-0rSVdmJOd2JZrtRcpzXMILcQiRZMwHsKjBkv-ITD-GCmKQhsN8QV6TcOW32W6C735YFUC-2br6AqoWgk4Un4kWRi02XhykaGzaQSHxkqSYJjOzmTK98Z6U7x316D_vrmOtL12mOR5sCv5g80OK__WazVqe8_Jlf_flQeufG3LmmzHzHYka2ZISCBQ-v3VUcYjLNZnk3G2eekgnhIrKGOlycuIflpjFsINUtdou1d4H_qK_XqrVCnjsZmBzMS8pBYzBBFBzAKakBLEWHJEfUhkHfsCn2cQet_sBmoC1R6LQBkh6vPmdbzqHr1fUV2rm_dKLmtwRN-vJKG52UFbVG3JEmQ4h0elZSxX6sEq1ZLTQLE1XL7iXZjLyhEEjXTLcevxAEyi-A3q17Nj
-->

![](./img/alignments.png)
Screenshot showing the alignments track, which contains both a
coverage view at the top and a pileup view at the bottom

### Show soft clipping

If a read contains bases that do not map the the genome properly, they can
either be removed from the alignment (hard clipping) or can be included, and
not shown by default (soft clipping)

JBrowse 2 also contains an option to "show the soft clipping" that has occured.
This can be valuable to show the signal around a region that contains
structural variation or difficult mappability

<!--
image info:
window.innerWidth
1378
window.innerHeight
513
http://localhost:3001/?config=test_data%2Fvolvox%2Fconfig.json&session=eJztVVFv2jAQ_ivIT5sENAHaoryxdms7VR0qrJs0Tcgkh-M1cTLbCTCU_76zQ5N0pFWr7XEvkXx33_edL5_tHRE0BuKRK6GBSap5IjoalO7AhsZpBKRLYioZF8RzuiSQdA3yCw90SLzheNQlOYe1It63HeEB0vCaZmFoEK63qRG45gKovACRxHCHIMwkq5UCPd0Qb3Dijkb9oTMYDN3T8fhkeNwly3QK0iSdvovKXKUR3UJwCwzJS0kJq5uyfV-zCTIqTaW2nYLAdo4dx0GshBykAgysaKSgS6hSEC-j7R6cJ1GebEjxHZuV1L9v7Icx9-P7H4uv63ojk4gzEYPQam6KMRECZyHKDo5R2E_EirOsnEFF3osSwXoSaKB6Ku_5ksYInPIIsrSk8faKm9j9fJ8Fp25YSzbrajnXOZTbtUPstq6C59pZpBaBxaI5FVvZsZWdNddhZ3bXeWPq33YqQHOcZnYPA8V5-hT9kMitidaDMxka0FSDbLR8hqyTfRSRuLpO_GpfmeRYYzy1CKimR6XGUdt--na8heXgf8NhPtwQKfiZgfBhctD0fJ2847puW9v1i0X7gyXXpCgK41IRgESjGlD5-273oYP_WiUQN8vZB6A6k9BS3pIsrNrsZnqW4LGgDB77T7Nfq_MLeTPa1P47KK5NOHrGgy2wlxhRidTfw17hxseof2TJxg7qX6yy5X_zPjLvn-5tjK3Nky1Zy6EgAl-bK95EuWBYbDcQJusHBPG0zKCMlWehjJjLO-QBXOIIjNr-pq9DnxBvHqsqZa04s5KJnJethRxFpB9yn0akFLHOvaZLiFRT-wxNA9I8antC00D1PDLQdhBNvnlTrzpuT1dUp-_yqZLzhpwxXRJFNLXv3A6ntuIRdjiHjTZjLF_qthfaTJ76mudw_or2n8kV9kYQuECNK4FvMprP8BXFb9Ec-8Q
-->

![](./img/alignments_soft_clipped.png)
Shows what turning on soft-clipping enables for a simulated long-read
dataset. There is a simulated structural variant, a deletion, at this position,
so the read has bases that map to the other side of the deletion being revealed
by this.

### Sort by options

The alignments tracks can also be configured to "sort by" a specific attribute
for reads that span **the center line**.

By default the center line is not shown, but by showing it (Go to the view's
hamburger menu->Select "Show center line") then you will obtain a better idea
of what the "sort by" option is doing

### Showing the center line

Here is how to turn on the center line

1. Open the hamburger menu in the top left of the linear genome view
2. Select "Show center line"

<!--
http://localhost:3001/?config=test_data%2Fvolvox%2Fconfig.json&session=eJzNVU1vm0AQ_SvWnmmCQz65pYmapHJcJ7GaVlVljWEMKy8L2l0TLIv_3llwAMckh6qHHnzwzJt58_GY3TAJCTKf3UmDkQLDUzkwqM0AC0gygcxhCaiIS-a7DgsVvKB65qGJme-dHzss5_iimf9rw3hIaXibZmbTULhZZ5ZgxCWCukGZJvidgsiTLhYazaRg_vDc9Y7ODi6G3pHnnXpn5w6bZxNU1uceuPQ35DoTsMbwESNKXlMqXIzr8gMTXVJGbUCZqlKUVM6J67pDh2A5Ko1kWIDQ6DDQGpO5WG-D81TkacHK31SsgmDZ6adY3l9M5DK_bRu5FDySCUqjpxZMjhh5FBPt0QkRB6lc8GhVz6BJPptDQsgJF7jK6jh_S_FzdHLj_Rjfr4uWo4tr8w_d_fyb_pCqj7twh3-WVRDyym7fn3SqDIYHhBg0iO6E7DheZ0QjCoBWnKq1tbazsB4IITOoOkV9huRya6SNQjJKg6buleKEsCKZhWDgsGY43CuKlQ7JKsTCBom_SEA_zsqytEKgPIq0YMPrgT1uTXuTbBwU95RHXxDMSmEPvMdZVmxP48lVSsqDCHc3jsdfn29OJw-dr2MP2279-IOl94T1bl7LLNjiPlr_LuwfaaBTY6sFvZr_52p5K5dOG30i6PFWOTQKDIw9W9bKZURgW6OO05fXCOYbtcLaVouvttiDFPMQbxFCy7a9Xq3pG8XbA9y4quU_VZSpmtalxZxIVBDzAASrSSqtjGCOQne5r2iJqOyhbvmbix-hqebQTTft0jXyfh_RyP32Pch1h45Z3QsBWXW6NzS0BRdU4BQLY6dYPz59j44dPASG53j9pvyy-pYkcRH4TtJ7IQOsHOUf_vx6KA
!-->

![](./img/alignments_center_line.png)
Illustrates before and after turning on the center line. The center line is an
indicator that shows what base pair underlies the center of the view. Note that
this is used in the "Sort by" option discussed below; the sort is performed
using properties of the feature or even exact base pair underlying the center
line

### Sorting by base

Sorting by base will re-arrange the pileup so that the reads that have a
specific base-pair mutation at the position crossing the center line (which is
1bp wide) will be arranged in a sorted manner. To enable Sort by base

1. Open the track menu for the specific track using the vertical '...' in the
   track label
2. Select 'Sort by'->'Base pair'

<!--
http://localhost:3001/?config=test_data%2Fvolvox%2Fconfig.json&session=eJzNVcFO20AQ_RW0Zzc4JBTwLYAoSJRGkLZSqyqaeCfrFeu1tbsxiSL_O7N2sA0xHKoeeuCQmTfz3s48xlumIUUWsRvtUBhwMtMHDq07wDWkuUIWsBSMkJpFYcC4gSc0PyV3CYtGp-OAFRKfLIt-b5nk1Ea2bea-DZW7Te4JbqVGMF9QZyn-oCLKZMulRTdds2h4Go6OTgZnw9HRaPR5dHIasEU-ReNz4SCkn1zaXMEG-T0Kal5TGlze1fJjJybU0TowrlKKmuQch2E4DAhWoLFIgSUoiwEDazFdqM2uuMhUka1Z-YfEGogfO-9ZP349m-rH4rp9yERJoVPUzs48mBIJSpEQ7dExEceZXkqxqmfQNJ8vICXkVCpc5XVdtKNIr_gv8R3uxrrl6OLa_sNwv_-2v6R6xw1_xT_PKwhldffdn2xmHPIBIQ4aRHdCfhwvM6IRxUArzszGR9tZ-AxwyB2ajqhzSCe7IG0U0tssbnSvjCSEN8mcg4PDmuFwTxQrA7IVx7UvUn_RgP4kK8vSG4H6GPKCL68Hdr8L7U2ySVDdQyGuENzKYA-8J1lWbA9304uMnAcCX298gsKdXy7iol34Hrbd-viDpfeU9W7e6jze4T5a_2vYP_JAR2PrBbta_OdueWuXzjP6TNCTrXpYVBg7f7Z8VGpBYK_RJtnTSwWLnFlhHavNV0f8QUokx2sE7tl216sNfaN6f4CbVLX8h4oyM7NaWiKJxMSJjEGxmqTyyi0sUNku9wUtEY0_1C1_c_EFumoO3XazLl1j7_cRjd2v34NcduiY971SkFene0tDW0pFAme4dn6K9cen76PjBw-xkwVevpFfVv9LmrgIfKPpe6FjrBLlMyhVeuQ
-->

![](./img/alignments_sort_by_base.png)
Illustrating the pileup re-ordering that happens when turning on the
"Sort by"->"Base pair". The sorting is done by specifically what letter of each
read underlies the current center line position (the center line is 1bp wide,
so sorted by that exact letter)

There are other sorting options available and more to come. If you have any
requests please drop us a line via github
[here](https://github.com/GMOD/jbrowse-components/issues)
