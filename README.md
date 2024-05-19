# FFTNoiseRemoval
Time of upload: May 19 2024

Group project of linear algebra class (MT1007), 1st year, Ho Chi Minh univercity of technology of Vietnam national universities (HCMUT).



Description:
apply FFT to remove noise on an user-uploaded audio file, utilizing html workers.
the filter function also takes in a leniency parameter, the lower it is, the more audio get left in, default value is 3, reccomend to be around 20 - 40 for human voice audio.


CAUTION: the website can freeze up if the uploaded audio is too long, please only upload audio of less then 5 seconds for a resonable processing time



Detailed description of the alogrothm:
-> Apply FFT to the PCM data of the audio to extract the frequencies
-> filter out any unwanted frequencies, in this case ou group decided to filter out any frequency whose magnitude is less than a portion of the highest recorded magnitude;
-> Apply iFFT to get a new PCM data


